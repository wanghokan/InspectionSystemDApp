import { FetchInspectionSheetTypes } from './inspection-sheet.types'

export const fetchInspectionSheetStart = () => ({
    type: FetchInspectionSheetTypes.FETCH_INSPECTION_SHEET_START
})

export const fetchInspectionSheetSuccess = sheetContent => ({
    type: FetchInspectionSheetTypes.FETCH_INSPECTION_SHEET_SUCCESS,
    payload: sheetContent
})

export const fetchInspectionSheetFailure = errorMessage => ({
    type: FetchInspectionSheetTypes.FETCH_INSPECTION_SHEET_FAILURE,
    payload: errorMessage
})

export const fetchInspectionSheetAsync = (contract, selectedProject, sheetIndex) => {
    return dispatch => {
        dispatch(fetchInspectionSheetStart)

        contract.methods.sheetContent(selectedProject, sheetIndex).call()
            .then(result => {
                dispatch(fetchInspectionSheetSuccess(result))
            })
            .catch(error => dispatch(fetchInspectionSheetFailure(error.message)))
    }
}