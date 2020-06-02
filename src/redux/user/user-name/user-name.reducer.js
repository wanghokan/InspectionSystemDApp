import { FetchUserInfoTypes } from '../user.types'

const INITIAL_STATE = {
    name: '',
    isFetching: false,
    errorMessage: undefined
}

const userNameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FetchUserInfoTypes.FETCH_NAME_START:
            return {
                ...state,
                isFetching: true
            }
        case FetchUserInfoTypes.FETCH_NAME_SUCCESS:
            return {
                ...state,
                isFetching: false,
                name: action.payload
            }
        case FetchUserInfoTypes.FETCH_NAME_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default userNameReducer