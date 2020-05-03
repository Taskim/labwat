import * as mongoose from 'mongoose'

const Sound = mongoose.model(
    'Sound',
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            soundLink: {
                type: String,
                required: true,
            },
            svg: {
                type: String,
                required: true,
            },
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        },
        { timestamps: true }
    )
)

export default Sound
