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
            svgPaths: {
                type: String,
                required: true,
            },
        },
        { timestamps: true }
    )
)

export default Sound
