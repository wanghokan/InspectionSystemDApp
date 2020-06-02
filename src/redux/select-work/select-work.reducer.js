import { SelectWorkTypes } from './select-work.types'

const INITIAL_STATE = {
    firstLevel: 0,
    secondLevel: 0,
    thirdLevel: 0,
    forthLevel: 0
}

const selectWorkReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SelectWorkTypes.SELECT_FIRST_LEVEL_INDEX:
            return {
                ...state,
                firstLevel: action.payload
            }
        case SelectWorkTypes.SELECT_SECOND_LEVEL_INDEX:
            return {
                ...state,
                secondLevel: action.payload
            }
        case SelectWorkTypes.SELECT_THIRD_LEVEL_INDEX:
            return {
                ...state,
                thirdLevel: action.payload
            }
        case SelectWorkTypes.SELECT_FORTH_LEVEL_INDEX:
            return {
                ...state,
                forthLevel: action.payload
            }
        default:
            return state
    }
}

export default selectWorkReducer