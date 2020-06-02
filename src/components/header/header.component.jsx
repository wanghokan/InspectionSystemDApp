import React from 'react'

import TitleIcon from '../title-icon/title-icon.component'
import UserInfo from '../user-info/user-info.component'
import UserInfoCombinationIcon from '../user-info-combination-icon/user-info-combination-icon.component'

import './header.style.css'

const Header = () => (
    <div className='header' >
        <TitleIcon />
        <UserInfo />
        <UserInfoCombinationIcon />
    </div>
)

export default Header