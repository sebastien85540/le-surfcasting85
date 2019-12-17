const findUser = require ('../testUser')
    , assert   = require('assert')

describe('find user', () => {
    it("should find user with email", async () => {
        const response = await findUser('sebcbien85540@gmail.com')
        assert.equal(response.message, 'utilisateur trouvé')
    })
})