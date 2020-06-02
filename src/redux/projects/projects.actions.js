import { FetchProjectsTypes } from './projects.types'

import Contract from '../../smart-contract/contract.json'

export const fetchProjectsStart = () => ({
    type: FetchProjectsTypes.FETCH_PROJECTS_START
})

export const fetchProjectsSuccess = projects => ({
    type: FetchProjectsTypes.FETCH_PROJECTS_SUCCESS,
    payload: projects
})

export const fetchProjectsFailure = errorMessage => ({
    type: FetchProjectsTypes.FETCH_PROJECTS_FAILURE,
    payload: errorMessage
})

export const fetchProjectsAsync = contract => {
    return dispatch => {
        dispatch(fetchProjectsStart())
        
        contract.methods.projectIndex().call()
            .then(amount => {
                const projects = []
                for (let i = 0; i < amount; i++) {
                    contract.methods.projects(i).call()
                        .then(project => {
                            projects.push(project)
                            if (i == amount - 1) {
                                dispatch(fetchProjectsSuccess(projects))
                            }
                        })
                }
            })
            .catch(error => dispatch(fetchProjectsFailure(error.message)))
    }
}