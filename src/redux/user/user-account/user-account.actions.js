import { FetchUserInfoTypes } from '../user.types'

export const fetchAccountStart = () => ({
    type: FetchUserInfoTypes.FETCH_ACCOUNT_START
})

export const fetchAccountSuccess = account => ({
    type: FetchUserInfoTypes.FETCH_ACCOUNT_SUCCESS,
    payload: account
})

export const fetchAccountFailure = errorMessage => ({
    type: FetchUserInfoTypes.FETCH_ACCOUNT_FAILURE,
    payload: errorMessage
})

export const fetchAccountAsync = () => {
    return dispatch => {
        dispatch(fetchAccountStart())
        window.web3.eth.getAccounts()
            .then(accounts => {
                dispatch(fetchAccountSuccess(accounts[0]))
            })
            .catch(error => dispatch(fetchAccountFailure(error.message)))
    }
}

/*
export const getUserNameAsync = (account) => {
    return dispatch => {
        const userRef = firestore.doc(`User/${account}`)
        userRef.get()
            .then(result => {
                const data = result.data().name
                dispatch(getUserName(data))
            })
    }
}
*/