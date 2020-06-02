import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import SideBarItem from '../side-bar-item/side-bar-item.component'

import { setFunctionAmount, selectCurrentFunction } from '../../redux/side-bar/side-bar.actions'

import './side-bar.style.css'

const SideBar = ({ setFunctionAmount, selectCurrentFunction }) => {

    useEffect(() => {
        const element = document.getElementsByClassName('side-bar-container')
        setFunctionAmount(element[0].childElementCount)
    }, [])

    const selectLinkHandle = (event) => {
        selectCurrentFunction(event.target.id)
    }

    return (
        <div className='side-bar-container'>
            <Link to='/new_project' onClick={selectLinkHandle}>
                <SideBarItem className='sideBarItem' title='New Project' index={0} />
            </Link>
            <Link to='/import_inspection_items' onClick={selectLinkHandle}>
                <SideBarItem className='sideBarItem' title='Import Inspection Items' index={1} />
            </Link>
            <Link to='/new_sheet' onClick={selectLinkHandle}>
                <SideBarItem className='sideBarItem' title='New Sheet' index={2} />
            </Link>
            <Link to='/executing_state' onClick={selectLinkHandle}>
                <SideBarItem className='sideBarItem' title='Executing State' index={3} />
            </Link>
            <Link to='/export_sheet' onClick={selectLinkHandle}>
                <SideBarItem className='sideBarItem' title='Export Sheet' index={4} />
            </Link>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setFunctionAmount: (amount) => dispatch(setFunctionAmount(amount)),
    selectCurrentFunction: (index) => dispatch(selectCurrentFunction(index))
})

export default connect(null, mapDispatchToProps)(SideBar)