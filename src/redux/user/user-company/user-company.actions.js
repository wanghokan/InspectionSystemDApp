import { FetchUserInfoTypes } from '../user.types'
import { firestore } from '../../../firebase/firebase.utils'

export const fetchCompanyStart = () => ({
    type: FetchUserInfoTypes.FETCH_COMPANY_START
})

export const fetchCompanySuccess = company => ({
    type: FetchUserInfoTypes.FETCH_COMPANY_SUCCESS,
    payload: company
})

export const fetchCompanyFailure = errorMessage => ({
    type: FetchUserInfoTypes.FETCH_COMPANY_FAILURE,
    payload: errorMessage
})

export const fetchCompanyAsync = account => {
    return dispatch => {
        const userDocumentRef = firestore.doc(`User/${account}`)
        dispatch(fetchCompanyStart())

        userDocumentRef.get()
            .then(result => {
                const companyDocumentRef = firestore.doc(`Company/${result.data().company}`)

                companyDocumentRef.get()
                    .then(result => {
                        dispatch(fetchCompanySuccess(result.data().name))
                    })
                    .catch(error => dispatch(fetchCompanyFailure(error.message)))
            })
            .catch(error => dispatch(fetchCompanyFailure(error.message)))
    }
}