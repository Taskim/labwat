import * as Joi from 'joi'
import * as express from 'express'

import User from '../models/user'
import Role from '../models/role'
import { signUp } from '../validations/user'
import { parseError, sessionizeUser } from '../util/helpers'

const userRouter = express.Router()

userRouter.post('', async (req, res) => {
    try {
        const { username, email, password } = req.body
        await Joi.validate({ username, email, password }, signUp)
        const newUser = new User({ username, email, password })
        Role.findOne({ name: 'user' }, (_, role) => {
            newUser.roles = [role._id]
        })
        const sessionUser = sessionizeUser(newUser)
        await newUser.save()

        req.session.user = sessionUser
        res.send(sessionUser)
    } catch (err) {
        res.status(400).send(parseError(err))
    }
})

export default userRouter
