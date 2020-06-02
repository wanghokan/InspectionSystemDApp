import { SelectProjectTypes } from './selected-project.types'

export const selectProject = projectIndex => ({
    type: SelectProjectTypes.SELECT_PROJECT,
    payload: projectIndex
})

export const fetchProjectWBSStart = () => ({
    type: SelectProjectTypes.FETCH_PROJECT_WBS_START
})

export const fetchProjectWBSSuccess = wbs => ({
    type: SelectProjectTypes.FETCH_PROJECT_WBS_SUCCESS,
    payload: wbs
})

export const fetchProjectWBSFailure = errorMessage => ({
    type: SelectProjectTypes.FETCH_PROJECT_WBS_FAILURE,
    payload: errorMessage
})

export const fetchProjectWBSAsync = (projects, projectIndex) => {
    return dispatch => {
        const hash = projects[projectIndex].wbs
        dispatch(fetchProjectWBSStart())

        fetch(`https://ipfs.infura.io/ipfs/${hash}`)
            .then(result => result.json())
            .then(wbs => {
                dispatch(fetchProjectWBSSuccess(wbs))
            })
            .catch(error => dispatch(fetchProjectWBSFailure(error.message)))
    }
}