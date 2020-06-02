import { SetFileBufferTypes } from './file-buffer.types'

const INITIAL_STATE = {
    fileBuffer: undefined
}

const fileBufferReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SetFileBufferTypes.SET_FILE_BUFFER:
            return {
                ...state,
                fileBuffer: action.payload
            }
        default:
            return state
    }
}

export default fileBufferReducer