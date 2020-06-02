import { FetchExecutingStateTypes } from './executing-state.types'

const INITIAL_STATE = {
    executingState: undefined,
    isFetching: false,
    errorMessage: undefined
}

const executingStateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FetchExecutingStateTypes.FETCH_EXECUTING_STATE_START:
            return {
                ...state,
                isFetching: true
            }
        case FetchExecutingStateTypes.FETCH_EXECUTING_STATE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fetched: true,
                executingState: action.payload
            }
        case FetchExecutingStateTypes.FETCH_EXECUTING_STATE_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default executingStateReducer