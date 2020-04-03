var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.user
const Role = db.role

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        Role.findOne({ name: 'user' }, (err, role) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            user.roles = [role._id]
            user.save(err => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }

                res.send({ message: 'User was registered successfully!' })
            })
        })
    })
}

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username,
    })
        .populate('roles', '-__v')
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            if (!user) {
                return res.status(400).send({ message: 'Invalid credentials' })
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            )

            if (!passwordIsValid) {
                return res.status(400).send({
                    accessToken: null,
                    message: 'Invalid credentials',
                })
            }

            var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 2678400, // 31 days
            })

            var authorities = []

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
            })
        })
}
