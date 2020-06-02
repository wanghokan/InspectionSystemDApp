import { SideBarFunctionTypes } from './side-bar.types'
import { selectCurrentFunction, setSelectedArray, cancelSelection } from './side-bar.utils'

const INITIAL_STATE = {
    selectedArray: []
}

const sideBarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SideBarFunctionTypes.SET_FUNCTIONS_AMOUNT:
            return {
                ...state,
                selectedArray: setSelectedArray(action.payload)
            }
        case SideBarFunctionTypes.SELECT_CURRENT_FUNCTION:
            return {
                ...state,
                selectedArray: selectCurrentFunction(state, action.payload)
            }
        case SideBarFunctionTypes.CANCEL_SELECTION:
            return {
                ...state,
                selectedArray: cancelSelection(state)
            }
        default:
            return state
    }
}

export default sideBarReducer