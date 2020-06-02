import { FetchUserInfoTypes } from '../user.types'

const INITIAL_STATE = {
    account: '',
    isFetching: false,
    errorMessage: undefined
}

const userAccountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FetchUserInfoTypes.FETCH_ACCOUNT_START:
            return {
                ...state,
                isFetching: true
            }
        case FetchUserInfoTypes.FETCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                account: action.payload
            }
        case FetchUserInfoTypes.FETCH_ACCOUNT_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default userAccountReducer