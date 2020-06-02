import React from 'react'

import './custom-button.style.css'

const CustomButton = ({ label, onClick }) => (
    <button className='custom-button' onClick={onClick}>
        <a className='custom-button-label'>{label}</a>
    </button>
)

export default CustomButton