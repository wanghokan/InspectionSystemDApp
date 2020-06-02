import { FetchContractInfoTypes } from './contract.types'

const INITIAL_STATE = {
    contract: undefined,
    contractAddress: '',
    isFetching: false,
    errorMessage: undefined
}

const contractReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FetchContractInfoTypes.SET_CONTRACT:
            return {
                ...state,
                contract: action.payload
            }
        case FetchContractInfoTypes.FETCH_CONTRACT_ADDRESS_START:
            return {
                ...state,
                isFetching: true
            }
        case FetchContractInfoTypes.FETCH_CONTRACT_ADDRESS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                contractAddress: action.payload
            }
        case FetchContractInfoTypes.FETCH_CONTRACT_ADDRESS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default contractReducer