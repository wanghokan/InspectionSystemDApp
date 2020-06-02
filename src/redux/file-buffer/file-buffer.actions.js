import { SetFileBufferTypes } from './file-buffer.types'

export const setFileBuffer = fileBuffer => ({
    type: SetFileBufferTypes.SET_FILE_BUFFER,
    payload: fileBuffer
})

