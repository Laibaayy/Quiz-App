import React, { useContext } from 'react'
import { useEffect } from 'react'
import { quizcontext } from '../Contexts/QuizProvider';

const Timer = () => {
    const { TimeRemaining, dispatch } = useContext(quizcontext)
    const min = Math.floor(TimeRemaining / 60);
    const sec = Math.floor(TimeRemaining % 60);


    useEffect(() => {
        let timer = setInterval(() => {
            dispatch({ type: "TimeInterval" })
        }, 1000)
        return function () {
            clearInterval(timer)
        }
    }, [dispatch])
    return (
        <div className='timer' style={{ color: 'white' }}>
            {min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
        </div>
    )
}


export default Timer;