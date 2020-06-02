import { FetchInspectionSheetTypes } from './inspection-sheet.types'

const INITIAL_STATE = {
    sheetContent: undefined,
    isFetching: false,
    errorMessage: undefined
}

const inspectionSheetReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FetchInspectionSheetTypes.FETCH_INSPECTION_SHEET_START:
            return {
                ...state,
                isFetching: true
            }
        case FetchInspectionSheetTypes.FETCH_INSPECTION_SHEET_SUCCESS:
            return {
                ...state,
                isFetching: false,
                sheetContent: action.payload
            }
        case FetchInspectionSheetTypes.FETCH_INSPECTION_SHEET_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default inspectionSheetReducer