import { FetchInspectionItemsTypes } from './inspection-items.types'

const INITIAL_STATE = {
    inspectionItems: [],
    isFetching: false,
    errorMessage: undefined
}

const inspectionItemsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FetchInspectionItemsTypes.FETCH_INSPECTION_ITEMS_START:
            return {
                ...state,
                isFetching: true
            }
        case FetchInspectionItemsTypes.FETCH_INSPECTION_ITEMS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                inspectionItems: action.payload
            }
        case FetchInspectionItemsTypes.FETCH_INSPECTION_ITEMS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default inspectionItemsReducer