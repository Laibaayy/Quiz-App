import React, { useContext } from 'react'
import { quizcontext } from '../Contexts/QuizProvider'

const Progress = () => {
    const { points, questions, index, totalpoints, answer } = useContext(quizcontext)
    return (
        <>
            <progress className='progress' max={questions.length} value={index + Number(answer !== null)} />
            <div className='marksprogress' style={{ color: 'white' }}>
                <p>{index + 1}/{questions.length}</p>
                <p>{points}/{totalpoints}</p>
            </div>
        </>
    )
}

export default Progress
