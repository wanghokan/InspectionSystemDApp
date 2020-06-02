import React from 'react'

import './with-selected-checker.style.css'

const WithSelectedChecker = WrappedComponent => ({ isSelected, ...otherProps }) => {
    return isSelected ? (
        <WrappedComponent {...otherProps} />
    ) : (
            <div className='with-selected-checker-page'>
                <div className='unselected-alert'>
                    <a>Please go to the homepage to select the project!</a>
                </div>
            </div>
        )
}

export default WithSelectedChecker