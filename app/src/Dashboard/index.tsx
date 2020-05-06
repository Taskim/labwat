import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllSoundsRequest } from './actions'
import { allSoundSelector } from './selectors'
import { State } from '../types'
import { DashboardState } from './types'
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

    const play = (id: string) => {
        const nextAudio = document.querySelector<HTMLAudioElement>(
            `audio[data-key="${id}"]`
        )!
        setBackground(sounds[id].svg)
        nextAudio.play()
    }

    return (
        <>
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
