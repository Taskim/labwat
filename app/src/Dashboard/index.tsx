import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { logoutRequest } from '../Session/actions'
import { getAllSoundsRequest } from './actions'
import { allSoundSelector } from './selectors'
import { State } from '../types'
import { DashboardState } from './types'
import { SessionState } from '../Session/types'
import UploadForm from './components/UploadForm'
import { setBackground } from '../Background/actions'

const mapStateToProps = (state: State) => ({
    session: state.session,
    sounds: allSoundSelector(state),
})

type Props = {
    getAllSounds: typeof getAllSoundsRequest
    setBackground: typeof setBackground
    sounds: DashboardState
    logout: typeof logoutRequest
    session: SessionState
}

const Dashboard = ({
    getAllSounds,
    sounds,
    logout,
    session,
    setBackground,
}: Props) => {
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
            <h1>Hi {session.username}</h1>
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
            <UploadForm />
        </>
    )
}

export default connect(mapStateToProps, {
    logout: logoutRequest,
    getAllSounds: getAllSoundsRequest,
    setBackground,
})(Dashboard)
