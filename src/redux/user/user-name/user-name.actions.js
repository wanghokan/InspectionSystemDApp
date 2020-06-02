import { FetchUserInfoTypes } from '../user.types'
import { firestore } from '../../../firebase/firebase.utils'

export const fetchNameStart = () => ({
    type: FetchUserInfoTypes.FETCH_NAME_START
})

export const fetchNameSuccess = name => ({
    type: FetchUserInfoTypes.FETCH_NAME_SUCCESS,
    payload: name
})

export const fetchNameFailure = errorMessage => ({
    type: FetchUserInfoTypes.FETCH_NAME_FAILURE,
    payload: errorMessage
})

export const fetchNameAsync = account => {
    return dispatch => {
        const documentRef = firestore.doc(`User/${account}`)
        dispatch(fetchNameStart())

        documentRef.get()
            .then(result => {
                if (result.exists) {
                    dispatch(fetchNameSuccess(result.data().name))
                }
                else {
                    dispatch(fetchNameSuccess('未註冊'))
                }
            })
            .catch(error => dispatch(fetchNameFailure(error.message)))
    }
}