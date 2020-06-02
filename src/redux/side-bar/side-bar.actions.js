import { SideBarFunctionTypes } from './side-bar.types'

export const setFunctionAmount = amount => ({
    type: SideBarFunctionTypes.SET_FUNCTIONS_AMOUNT,
    payload: amount
})

export const selectCurrentFunction = index => ({
    type: SideBarFunctionTypes.SELECT_CURRENT_FUNCTION,
    payload: index
})

export const cancelSelectedFunction = () => ({
    type: SideBarFunctionTypes.CANCEL_SELECTION
})