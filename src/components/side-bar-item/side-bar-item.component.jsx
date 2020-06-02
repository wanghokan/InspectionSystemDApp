import React from 'react'
import { connect } from 'react-redux'

import './side-bar-item.style.css'

const SideBarItem = ({ selected, title, index }) => {
    const className = (selected[index]) ? 'selected-side-bar-item' : 'side-bar-item'
    return (
        <div className={className} id={index}>
            {title}
        </div>
    )
}

const mapStateToProps = state => ({
    selected: state.sideBar.selectedArray
})
export default connect(mapStateToProps)(SideBarItem)