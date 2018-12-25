const bcrypt = require('bcryptjs')

const Users = require('./../../models/users')


class SignupController {
    async signup(request, response) {
        const email = request.body.email
        const password = request.body.password
    
        try {
            const user = await Users.findOne({ email })
    
            if (user) {
                return response.status(409).json({
                    success: false,
                    data: {
                        message: `Credentials is invalid`
                    }
                })
            }
    
            bcrypt.genSalt(10, (error, salt) => {
                bcrypt.hash(password, salt, async (error, hash) => {
                    if (error) {
                        return response.status(500).json({
                            message: `Can't sign up`,
                            error
                        })
                    }

                    try {
                        await Users.create({ email, password: hash })

                        response.status(201).json({
                            success: true,
                            data: {
                                message: `User was created`
                            }
                        })
                    } catch (error) {
                        response.status(500).json({
                            error
                        })
                    }
                })
            })
        } catch (error) {
            response.status(500).json({
                error
            })
        }
    }
}

module.exports = new SignupController()
