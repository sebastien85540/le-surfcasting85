const users = require('./db/user')

const findUser = (email) => {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.email == email)
            if (!user) {
                return reject(new Error('l\'utilisateur est introuvable'))
            } return resolve({
                message: 'utilisateur trouvé',
                user
            })
        }, 1000)
    })
}
module.exports = findUser
