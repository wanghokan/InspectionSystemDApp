import { SelectWorkTypes } from './select-work.types'

export const selectFirstLevelWork = firstLevelIndex => ({
    type: SelectWorkTypes.SELECT_FIRST_LEVEL_INDEX,
    payload: firstLevelIndex
})

export const selectSecondLevelWork = secondLevelIndex => ({
    type: SelectWorkTypes.SELECT_SECOND_LEVEL_INDEX,
    payload: secondLevelIndex
})

export const selectThirdLevelWork = thirdLevelIndex => ({
    type: SelectWorkTypes.SELECT_THIRD_LEVEL_INDEX,
    payload: thirdLevelIndex
})

export const selectForthLevelWork = forthLevelIndex => ({
    type: SelectWorkTypes.SELECT_FORTH_LEVEL_INDEX,
    payload: forthLevelIndex
})