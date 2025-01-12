const jwt = require('jsonwebtoken')
const {secret} = require('../security')
const resHandler = require('../handlers/responseHandler')

module.exports = function(req: any, res: any, next: any) {
    try {
        const token = req.headers['authorization']
        
        if (!token) resHandler.sendError(res, 401, "У вас не достаточно прав для этого запроса")
        
        const decodeData = jwt.verify(token, secret, (err: any) => {
            if (err) {
                console.log(err)
                resHandler.sendError(res, 403, "Вам отказано в доступе")
            }
        })
        req.user = decodeData
    
        next()
    } catch(e) {
        console.log(e)
        resHandler.sendError(res, 500, "Неизвестная ошибка")
    }
}