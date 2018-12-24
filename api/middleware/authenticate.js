const jwt = require('jsonwebtoken')

const secret = 'secret'


function Authenticate(request, response, next) {
    try {
        const token = request.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret)
        
        request.userData = decoded
        next()
    } catch (error) {
        response.status(401).json({
            success: false,
            data: {
                message: 'Auth failed',
            }
        })
    }
}


module.exports = Authenticate
