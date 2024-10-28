import React, { useContext } from 'react'
import { quizcontext } from '../Contexts/QuizProvider'


const Ready = () => {
    const { questions, dispatch } = useContext(quizcontext)
    const clickhandler = () => {
        dispatch({ type: "Start" })
    }
    return (
        <div className='starting'>
            <h1>Welcome To React Quiz</h1>
            <h2>{questions.length} Questions to test your react mastery !</h2>
            <button className='startbtn' onClick={clickhandler}>Let's Start</button>
        </div>
    )
}

export default Ready
