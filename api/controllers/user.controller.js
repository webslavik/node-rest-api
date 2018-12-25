const Users = require('./../models/users')


class UserController {
    async deleteUser(request, response) {
        const id = request.params.userId;
    
        try {
            await Users.findByIdAndDelete(id)
            
            response.status(200).json({
                success: true,
                data: {
                    message: 'User was deleted',
                }
            })
        } catch (error) {
            response.status(500).json({
                error
            })
        }
    }
}

module.exports = new UserController()
