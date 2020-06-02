import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchNameAsync } from '../../redux/user/user-name/user-name.actions'
import { fetchCompanyAsync } from '../../redux/user/user-company/user-company.actions'

import { ReactComponent as UserIcon } from '../../assets/user.svg'
import { ReactComponent as CompanyIcon } from '../../assets/company.svg'
import { ReactComponent as ProjectIcon } from '../../assets/project.svg'

import './user-info.style.css'

const UserInfo = ({ expanded, account, fetchUserName, name, fetchUserCompany, company, projects, selectedProject }) => {
    const className = expanded ? 'clicked-user-info-container' : 'user-info-container'
    useEffect(() => {
        if (account) {
            fetchUserName(account)
            fetchUserCompany(account)
        }
    }, [account])
    return (
        <div className={className}>
            <div className='user-info-item-container'>
                <UserIcon className='icon' />
                <a className='info'>{name}</a>
            </div>
            <div className='company-info-item-container'>
                <CompanyIcon className='icon' />
                <a className='info'>{company}</a>
            </div>
            <div className='project-info-item-container'>
                <ProjectIcon className='icon' />
                <a className='info'>
                    {selectedProject != -1
                        ? window.web3.utils.toUtf8(projects[selectedProject].name)
                        : 'unselected'}
                </a>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    expanded: state.header.expanded,
    account: state.userAccount.account,
    name: state.userName.name,
    company: state.userCompany.name,
    projects: state.projects.projects,
    selectedProject: state.selectedProject.selectedProject
})

const mapDispatchToProps = dispatch => ({
    fetchUserName: account => dispatch(fetchNameAsync(account)),
    fetchUserCompany: account => dispatch(fetchCompanyAsync(account)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)