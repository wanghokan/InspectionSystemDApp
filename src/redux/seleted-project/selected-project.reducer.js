import { SelectProjectTypes } from './selected-project.types'

const INITIAL_STATE = {
    selectedProject: -1,
    WBSFirstLevel: undefined,
    WBSSecondLevel: undefined,
    WBSThirdLevel: undefined,
    WBSForthLevel: undefined,
    isFetching: false,
    errorMessage: undefined
}

const selectedProjectReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SelectProjectTypes.SELECT_PROJECT:
            return {
                ...state,
                selectedProject: action.payload
            }
        case SelectProjectTypes.FETCH_PROJECT_WBS_START:
            return {
                ...state,
                isFetching: true
            }
        case SelectProjectTypes.FETCH_PROJECT_WBS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                WBSFirstLevel: action.payload.term,
                WBSSecondLevel: action.payload.class,
                WBSThirdLevel: action.payload.task,
                WBSForthLevel: action.payload.location
            }
        case SelectProjectTypes.FETCH_PROJECT_WBS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default selectedProjectReducer