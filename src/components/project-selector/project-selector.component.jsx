import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchProjectsAsync } from '../../redux/projects/projects.actions'
import { selectProject, fetchProjectWBSAsync } from '../../redux/seleted-project/selected-project.actions'

import './project-selector.style.css'

const ProjectSelector = ({ contract, fetchProjects, projects, selectProject, fetchProjectWBS }) => {

    useEffect(() => {
        if (contract) {
            fetchProjects(contract)
        }
    }, [contract])

    const selectProjectIndex = event => {
        selectProject(event.target.value)
        fetchProjectWBS(projects, event.target.value)
    }

    return (
        <div className='project-selector-container'>
            <a>Select the project: </a>
            <select className='project-selector' onChange={selectProjectIndex}>
                <option value={-1}></option>
                {
                    projects.map((project, index) => (
                        <option key={index} value={index}>{window.web3.utils.toUtf8(project.name)}</option>
                    ))
                }
            </select>
        </div>
    )
}

const mapStateToProps = state => ({
    contract: state.contract.contract,
    projects: state.projects.projects
})

const mapDispatchToProps = dispatch => ({
    fetchProjects: contract => dispatch(fetchProjectsAsync(contract)),
    selectProject: projectIndex => dispatch(selectProject(projectIndex)),
    fetchProjectWBS: (projects, selectedProject) => dispatch(fetchProjectWBSAsync(projects, selectedProject))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector)