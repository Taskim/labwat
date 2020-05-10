import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'

import { getAllSoundsRequest } from './actions'
import { allSoundSelector } from './selectors'
import { State } from '../types'
import { DashboardState, Sound } from './types'
import { setBackground } from '../Background/actions'
import s from './style.module.css'

const mapStateToProps = (state: State) => ({
    sounds: allSoundSelector(state),
})

type Props = {
    getAllSounds: typeof getAllSoundsRequest
    setBackground: typeof setBackground
    sounds: DashboardState
}

const Dashboard = ({ getAllSounds, sounds, setBackground }: Props) => {
    useEffect(() => {
        getAllSounds()
    }, [])

    const [currentSound, setCurrentSound] = useState<Sound>()

    const play = (id: string) => {
        if (currentSound) {
            const currentAudio = document.querySelector<HTMLAudioElement>(
                `audio[data-key="${currentSound._id}"]`
            ) as HTMLAudioElement
            if (currentAudio) {
                currentAudio.pause()
                currentAudio.currentTime = 0
            }
        }
        const nextAudio = document.querySelector<HTMLAudioElement>(
            `audio[data-key="${id}"]`
        )!
        nextAudio.play()
        setCurrentSound(sounds[id])
        setBackground(sounds[id].svg)
    }

    return (
        <>
            <Fab
                component={Link}
                to="/create"
                variant="extended"
                aria-label="add"
                classes={{ extended: s.fab }}
            >
                <AddIcon />
                Add
            </Fab>
            <div className={s.soundContainer}>
                {Object.values(sounds).map((sound) => (
                    <React.Fragment key={sound._id}>
                        <audio
                            // autoPlay
                            data-key={sound._id}
                            src={sound.soundLink}
                        />
                        <button
                            className={s.soundButton}
                            onClick={() => play(sound._id)}
                        >
                            {sound.name}
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default connect(mapStateToProps, {
    getAllSounds: getAllSoundsRequest,
    setBackground,
})(Dashboard)
