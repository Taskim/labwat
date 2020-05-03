import React from 'react'
import { connect } from 'react-redux'
import { Spring, animated } from 'react-spring/renderprops'

import { State } from '../types'
import { getPathsFromSVG } from './utils'
import s from './style.module.css'

type Props = {
    svg: string | null
}

const Background = ({ svg }: Props) => {
    if (!svg) return <div />

    const paths = getPathsFromSVG(svg)

    return (
        <div className={s.background}>
            <svg
                className="detail"
                viewBox="0 0 512 512"
                width="100%"
                height="100%"
            >
                {paths.map((p, i) => (
                    <Spring key={i} native to={p}>
                        {(styles) => {
                            return (
                                <animated.path
                                    d={styles.d}
                                    fill={styles.fill}
                                    fillOpacity={styles.fillOpacity}
                                />
                            )
                        }}
                    </Spring>
                ))}
            </svg>
        </div>
    )
}

const mapStateToProps = (state: State) => ({
    svg: state.background.svg,
})

export default connect(mapStateToProps)(Background)
