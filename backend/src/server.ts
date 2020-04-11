import * as express from 'express'
import * as mongoose from 'mongoose'
import * as session from 'express-session'
import * as connectStore from 'connect-mongo'
import * as path from 'path'

import { userRoutes, sessionRoutes, soundRoutes } from './routes/index'
import init from './util/init'
;(async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                init()
            })
        console.log('MongoDB connected')
        const app = express()
        const MongoStore = connectStore(session)

        app.disable('x-powered-by')

        // used to persist cookie in production, see https://github.com/expressjs/session#cookiesecure
        app.set('trust proxy', 1)

        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())
        app.use(
            session({
                name: process.env.SESS_NAME,
                secret: process.env.SESS_SECRET,
                saveUninitialized: false,
                resave: false,
                store: new MongoStore({
                    mongooseConnection: mongoose.connection,
                    collection: 'session',
                    ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
                }),
                cookie: {
                    sameSite: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: parseInt(process.env.SESS_LIFETIME),
                },
            })
        )

        const apiRouter = express.Router()
        app.use('/api', apiRouter)
        apiRouter.use('/users', userRoutes)
        apiRouter.use('/session', sessionRoutes)
        apiRouter.use('/sound', soundRoutes)

        const dir = path.join(__dirname, '../../app/build')

        app.use(express.static(dir))

        app.get('*', (_, res) => {
            res.sendFile(
                path.join(__dirname, '../../app', 'build', 'index.html')
            )
        })

        app.listen(process.env.PORT, () =>
            console.log(`Listening on port ${process.env.PORT}`)
        )
    } catch (err) {
        console.log(err)
    }
})()
