import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { cancelSelectedFunction } from '../../redux/side-bar/side-bar.actions'

import './title-icon.style.css'

const TitleIcon = ({ cancelSelection }) => {

    return (
        <div className='title-container'>
            <Link to='/' onClick={cancelSelection}>
                <div className='title'>
                    Blockchain Inspection System
                </div>
            </Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    cancelSelection: () => dispatch(cancelSelectedFunction())
})

export default connect(null, mapDispatchToProps)(TitleIcon)