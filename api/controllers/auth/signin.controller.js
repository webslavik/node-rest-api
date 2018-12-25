const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('./../../models/users')
const secret = 'secret'


class SigninController {
    async signin(request, response) {
        const email = request.body.email
        const password = request.body.password
    
        try {
            const user = await Users.findOne({ email })
            
            if (!user) {
                return response.status(401).json({
                    success: false,
                    data: {
                        message: 'Auth failed'
                    }
                })
            }
    
            const compareHash = await bcrypt.compare(password, user.password)
    
            if (!compareHash) {
                return response.status(401).json({
                    success: false,
                    data: {
                        message: 'Auth failed'
                    }
                })
            }
    
            const token = jwt.sign({ email: user.email, id: user._id }, secret, {
                expiresIn: '1h'
            })
    
            response.status(200).json({
                success: true,
                data: {
                    message: 'Auth completed',
                    token
                }
            })
        } catch (error) {
            response.status(500).json({
                error
            })
        }
    }
}

module.exports = new SigninController()
