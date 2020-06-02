import { firestore } from '../../firebase/firebase.utils'

import { FetchContractInfoTypes } from './contract.types'
import Contract from '../../smart-contract/contract.json'

export const setContract = contractAddress => ({
    type: FetchContractInfoTypes.SET_CONTRACT,
    payload: new window.web3.eth.Contract(Contract.abi, contractAddress)
})

export const fetchContractAddressStart = () => ({
    type: FetchContractInfoTypes.FETCH_CONTRACT_ADDRESS_START
})

export const fetchContractAddressSuccess = contractAddress => ({
    type: FetchContractInfoTypes.FETCH_CONTRACT_ADDRESS_SUCCESS,
    payload: contractAddress
})

export const fetchContractAddressFailure = errorMessage => ({
    type: FetchContractInfoTypes.FETCH_CONTRACT_ADDRESS_FAILURE,
    payload: errorMessage
})

export const fetchContractAddressAsync = account => {
    return dispatch => {
        const documentRef = firestore.doc(`User/${account}`)
        dispatch(fetchContractAddressStart())

        documentRef.get()
            .then(result => {
                const companyDocumentRef = firestore.doc(`Company/${result.data().company}`)

                companyDocumentRef.get()
                    .then(result => {
                        dispatch(fetchContractAddressSuccess(result.data().contractAddress))
                    })
                    .catch(error => dispatch(fetchContractAddressFailure(error.message)))
            })
            .catch(error => dispatch(fetchContractAddressFailure(error.message)))
    }
}