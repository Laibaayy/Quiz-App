import React from 'react'

const Active = ({ questiondata, dispatch, answer }) => {
    const hasanswered = answer !== null;
    return (
        <div>
            <p className='question'>{questiondata.question}</p>
            <div> {questiondata.options.map((option, index) => { return <button onClick={() => dispatch({ type: 'AnswerSelected', payload: index })} className={`options ${answer === index ? "answer" : ""} ${hasanswered ? index === questiondata.correctOption ? "correct" : "wrong" : ""}`} disabled={hasanswered} key={index}>{option}</button> })}</div>
        </div>
    )
}

export default Active
