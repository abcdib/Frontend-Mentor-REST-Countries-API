import React from 'react'
import loading from "./loadingWhiteSvg.svg"

const Spinner = () => {
    return (
        <div className='spinner-container'>
            <img src={loading} alt="" className='spinner-item' />
        </div>
    )
}

export default Spinner