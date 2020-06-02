import React from 'react'
import { connect } from 'react-redux'

import { expandUserInfo } from '../../redux/header/header.actions'

import './user-info-combination-icon.style.css'

const UserInfoCombinationIcon = ({ expandUserInfo }) => {
    return (
        <div className='user-info-combination-icon-container' onClick={() => expandUserInfo()}>
            <div className='menu-icon'>
                <div className='menu-icon-line' />
                <div className='menu-icon-line' />
                <div className='menu-icon-line' />
            </div>
        </div >
    )
}

const mapDispatchToProps = dispatch => ({
    expandUserInfo: () => dispatch(expandUserInfo())
})

export default connect(null, mapDispatchToProps)(UserInfoCombinationIcon)