import React from 'react'
import { useContext } from 'react';
import { quizcontext } from '../Contexts/QuizProvider';

const Active = () => {
    const { questionsdata, dispatch, answer } = useContext(quizcontext)
    const hasanswered = answer !== null;
    return (
        <div>
            <p className='question'>{questionsdata.question}</p>
            <div> {questionsdata.options.map((option, index) => { return <button onClick={() => dispatch({ type: 'AnswerSelected', payload: index })} className={`options ${answer === index ? "answer" : ""} ${hasanswered ? index === questionsdata.correctOption ? "correct" : "wrong" : ""}`} disabled={hasanswered} key={index}>{option}</button> })}</div>
        </div>
    )
}

export default Active
