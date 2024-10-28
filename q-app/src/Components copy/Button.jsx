import React from 'react'

const Button = ({ dispatch, answer, index, questions }) => {
    const finishhandler = () => {
        dispatch({ type: 'Finish' })
    }
    if (answer === null) return null;
    if (index < questions.length - 1)
        return (
            <div>
                <button className='nextbtn' onClick={() => { dispatch({ type: 'NextQuestion' }) }}>Next</button>
            </div>
        )
    if (index === questions.length - 1)
        return (
            <div>
                <button className='nextbtn' onClick={finishhandler}>Finish</button>
            </div>
        )
    return null;
}

export default Button
