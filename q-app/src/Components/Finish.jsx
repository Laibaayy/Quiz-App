import React, { useContext } from 'react'
import { quizcontext } from '../Contexts/QuizProvider';

const Finish = () => {
    const { points, totalpoints, hieghestpoints, dispatch } = useContext(quizcontext)
    const percentage = Math.ceil((points / totalpoints) * 100);
    return (
        <div style={{
            color: 'white', marginTop: "7rem"
        }}>
            <strong className='finish' >Congratulation You Have Completed Your Quiz {points}/{totalpoints} ({percentage}%)</strong>
            <p className='highest'> <strong>Highest Score: {hieghestpoints}</strong></p>
            <button className='restartbtn' onClick={() => dispatch({ type: 'Restart' })}> Restart</button>

        </div >
    )

}

export default Finish
