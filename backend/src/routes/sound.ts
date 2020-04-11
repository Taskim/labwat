import * as express from 'express'
import * as fetch from 'isomorphic-fetch'
import * as multer from 'multer'
import { Dropbox } from 'dropbox'

import Sound from '../models/sound'
import { parseError } from '../util/helpers'
import {
    replaceFilenameByUuid,
    setDropboxDownloadParamater,
} from '../util/sound'

const upload = multer({ storage: multer.memoryStorage() })

const dbx = new Dropbox({
    fetch: fetch,
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
})

const soundRouter = express.Router()

soundRouter.get('/all', async (req, res) => {
    try {
        const sounds = await Sound.find()
        res.send(sounds)
    } catch (err) {
        res.status(400).send(parseError(err))
    }
})

soundRouter.post('/upload', upload.any(), async (req, res) => {
    const { user } = req.session
    if (!user) {
        return res.status(401).send('Unauthorized')
    }
    const { name } = req.body
    const file = req.files[0]

    if (!file || file.mimetype !== 'audio/mpeg') {
        return res.status(400).send('wrong file type')
    }
    const filename = replaceFilenameByUuid(file.originalname)

    dbx.filesUpload({ path: '/' + filename, contents: file.buffer })
        .then(function (response) {
            dbx.sharingCreateSharedLink({ path: response.path_display })
                .then(async function (response) {
                    const sound = await new Sound({
                        name,
                        soundLink: setDropboxDownloadParamater(response.url),
                        svgPaths: `test.jpg`,
                    }).save()
                    res.send(sound)
                })
                .catch((err) => res.status(400).send(err.error))
        })
        .catch((err) => res.status(400).send(err.error))
})

export default soundRouter
