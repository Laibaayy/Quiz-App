import React from 'react'

const Progress = ({ points, questionnumber, index, totalpoints, answer }) => {
    return (
        <>
            <progress className='progress' max={questionnumber.length} value={index + Number(answer !== null)} />
            <div className='marksprogress' style={{ color: 'white' }}>
                <p>{index + 1}/{questionnumber.length}</p>
                <p>{points}/{totalpoints}</p>
            </div>
        </>
    )
}

export default Progress
