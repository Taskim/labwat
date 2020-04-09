import Role from '../models/role'

function init() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            ;['user', 'admin'].forEach((role) => {
                new Role({
                    name: role,
                }).save((err) => {
                    if (err) {
                        console.log('error', err)
                    }

                    console.log(`added ${role} to roles collection`)
                })
            })
        }
    })
}

export default init
