import { HeaderMenuTypes } from './header.types'

const INITIAL_STATE = {
    expanded: false
}

const headerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HeaderMenuTypes.EXPAND_USER_INFO:
            return {
                ...state,
                expanded: !state.expanded
            }
        default:
            return state
    }
}

export default headerReducer