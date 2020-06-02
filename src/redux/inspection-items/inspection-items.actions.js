import { FetchInspectionItemsTypes } from './inspection-items.types'

export const fetchInspectionItemsStart = () => ({
    type: FetchInspectionItemsTypes.FETCH_INSPECTION_ITEMS_START
})

export const fetchInspectionItemsSuccess = inspectionItems => ({
    type: FetchInspectionItemsTypes.FETCH_INSPECTION_ITEMS_SUCCESS,
    payload: inspectionItems
})

export const fetchInspectionItemsFailure = errorMessage => ({
    type: FetchInspectionItemsTypes.FETCH_INSPECTION_ITEMS_FAILURE,
    payload: errorMessage
})

export const fetchInspectionItemsAsync = (contract, selectedProject, workIndex) => {
    return dispatch => {
        dispatch(fetchInspectionItemsStart())

        contract.methods.inspectionItems(selectedProject, workIndex).call()
            .then(hash => {
                fetch(`https://ipfs.infura.io/ipfs/${hash}`)
                    .then(result => result.json())
                    .then(inspectionItems => {
                        dispatch(fetchInspectionItemsSuccess(inspectionItems))
                    })
                    .catch(error => dispatch(fetchInspectionItemsFailure(error.Message)))
            })
            .catch(error => dispatch(fetchInspectionItemsFailure(error.Message)))
    }
}