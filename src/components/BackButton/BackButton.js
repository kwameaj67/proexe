import React from 'react'
import './backButton.css'
import { HiChevronLeft } from 'react-icons/hi'

const BackButton = ({ goBackAction }) => {
    return (
        <div>
            <button className="back_btn" onClick={goBackAction}>
                <HiChevronLeft size={22} color="#338FFF" />
                <p>Back</p>
            </button>
        </div>
    )
}
export default BackButton