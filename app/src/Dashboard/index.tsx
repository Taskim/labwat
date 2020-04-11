import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { logoutRequest } from '../Session/actions'
import { getAllSoundsRequest } from './actions'
import { allSoundSelector } from './selectors'
import { State } from '../types'
import { DashboardState } from './types'
import { SessionState } from '../Session/types'

const mapStateToProps = (state: State) => ({
    session: state.session,
    sounds: allSoundSelector(state),
})

type Props = {
    getAllSounds: typeof getAllSoundsRequest
    sounds: DashboardState
    logout: typeof logoutRequest
    session: SessionState
}

const Dashboard = ({ getAllSounds, sounds, logout, session }: Props) => {
    useEffect(() => {
        getAllSounds()
    }, [])

    const play = (id: string) => {
        const nextAudio = document.querySelector<HTMLAudioElement>(
            `audio[data-key="${id}"]`
        )!
        nextAudio.play()
    }

    return (
        <>
            <h1>Hi {session.username}</h1>
            <p>You are now logged in!</p>
            <button onClick={logout}>Logout</button>
            <div>
                {Object.values(sounds).map((sound) => (
                    <React.Fragment key={sound._id}>
                        <audio
                            // autoPlay
                            data-key={sound._id}
                            src={sound.soundLink}
                        />
                        <button onClick={() => play(sound._id)}>
                            {sound.name}
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}

export default connect(mapStateToProps, {
    logout: logoutRequest,
    getAllSounds: getAllSoundsRequest,
})(Dashboard)
