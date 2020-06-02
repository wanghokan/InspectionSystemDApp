import { FetchExecutingStateTypes } from './executing-state.types'

export const fetchExecutingStateStart = () => ({
    type: FetchExecutingStateTypes.FETCH_EXECUTING_STATE_START
})

export const fetchExecutingStateSuccess = executingState => ({
    type: FetchExecutingStateTypes.FETCH_EXECUTING_STATE_SUCCESS,
    payload: executingState
})

export const fetchExecutingStateFailure = errorMessage => ({
    type: FetchExecutingStateTypes.FETCH_EXECUTING_STATE_FAILURE,
    payload: errorMessage
})

export const fetchExecutingStateAsync = (contract, selectedProject, FirstLevel, SecondLevel, ThirdLevel, ForthLevel) => {
    return dispatch => {
        let executingState = []
        dispatch(fetchExecutingStateStart())

        for (let i = 1; i < FirstLevel.length; i++) {
            let first = { key: null, name: null, children: [] }
            first.key = 10000000 * i
            first.name = FirstLevel[i]
            for (let j = 1; j < SecondLevel[FirstLevel[i]].length; j++) {
                let second = { key: null, name: null, children: [] }
                second.key = 10000000 * i + 100000 * j
                second.name = SecondLevel[FirstLevel[i]][j]
                for (let k = 1; k < ThirdLevel[SecondLevel[FirstLevel[i]][j]].length; k++) {
                    let third = { key: null, name: null, children: [] }
                    third.key = 10000000 * i + 100000 * j + 1000 * k
                    third.name = ThirdLevel[SecondLevel[FirstLevel[i]][j]][k]
                    for (let l = 1; l < ForthLevel[ThirdLevel[SecondLevel[FirstLevel[i]][j]][k]]; l++) {
                        let forth = { key: null, name: null, state: null }
                        forth.key = 10000000 * i + 100000 * j + 1000 * k + 1 * l
                        forth.name = ForthLevel[ThirdLevel[SecondLevel[FirstLevel[i]][j]][k]][l]
                        contract.methods.sheetContent(selectedProject, 10000000 * i + 100000 * j + 1000 * k + 1 * l).call()
                            .then(result => {
                                if (result._executor == '0x0000000000000000000000000000000000000000') {
                                    forth.state = '表單尚未建立'
                                    third.children.push(forth)
                                }
                                else {
                                    if (result._executed == 0) {
                                        forth.state = '表單已建立, 尚未執行查驗'
                                        third.children.push(forth)
                                    }
                                    else {
                                        let falseNum = 0
                                        for (let a = 0; a < result._itemsState.length; a++) {
                                            if (result._itemsState[a] == 2) {
                                                falseNum++
                                            }
                                        }
                                        if (falseNum == 0) {
                                            forth.state = '表單已建立, 已查驗, 無查驗項目不合格, 查驗時間: ' + window.web3.utils.toUtf8(result._executeTime) + ', 查驗人員: ' + result._executor.toString()
                                            third.children.push(forth)
                                        }
                                        else {
                                            forth.state = '表單已建立, 已查驗, ' + falseNum.toString() + '個查驗項目不合格, 查驗時間: ' + window.web3.utils.toUtf8(result._executeTime) + ', 查驗人員: ' + result._executor.toString()
                                            third.children.push(forth)
                                        }
                                    }
                                }

                            })
                            .catch(error => dispatch(fetchExecutingStateFailure(error.Message)))
                        if (l == ForthLevel[ThirdLevel[SecondLevel[FirstLevel[i]][j]][k]].length - 1) {
                            dispatch(fetchExecutingStateSuccess(executingState))
                        }
                    }
                    second.children.push(third)
                }
                first.children.push(second)
            }
            executingState.push(first)
        }
    }
}

/*
        FirstLevel.map((work, index) => {
            if (index != 0) {
                let first = { key: null, name: null, currentState: null, children: [] }
                first.key = 10000000 * index
                first.name = work
                SecondLevel[work].map((work, index) => {
                    if (index != 0) {
                        let second = { key: null, name: null, currentState: null, children: [] }
                        second.key = first.key + 100000 * index
                        second.name = work
                        ThirdLevel[work].map((work, index) => {
                            if (index != 0) {
                                let third = { key: null, name: null, currentState: null, children: [] }
                                third.key = second.key + 1000 * index
                                third.name = work
                                ForthLevel[work].map((work, index) => {
                                    if (index != 0) {
                                        let forth = { key: null, name: null, currentState: null }
                                        forth.key = third.key + 1 * index
                                        forth.name = work
                                        contract.methods.sheetContent(selectedProject, third.key + 1 * index).call()
                                            .then(result => {
                                                if (result._executor == '0x0000000000000000000000000000000000000000') {
                                                    forth.state = '表單尚未建立'
                                                }
                                                else {
                                                    if (result._executed == 0) {
                                                        forth.state = '表單已建立, 尚未執行查驗'
                                                    }
                                                    else {
                                                        let falseNum = 0
                                                        for (let a = 0; a < result._itemsState.length; a++) {
                                                            if (result._itemsState[a] == 2) {
                                                                falseNum++
                                                            }
                                                        }
                                                        if (falseNum == 0) {
                                                            forth.state = '表單已建立, 已查驗, 無查驗項目不合格, 查驗時間: ' + window.web3.utils.toUtf8(result._executeTime) + ', 查驗人員: ' + result._executor.toString()
                                                        }
                                                        else {
                                                            forth.state = '表單已建立, 已查驗, ' + falseNum.toString() + '個查驗項目不合格, 查驗時間: ' + window.web3.utils.toUtf8(result._executeTime) + ', 查驗人員: ' + result._executor.toString()
                                                        }
                                                    }
                                                }
                                            })
                                            .catch(error => dispatch(fetchExecutingStateFailure(error.Message)))
                                        third.children.push(forth)
                                    }
                                })
                                second.children.push(third)
                            }
                        })
                        first.children.push(second)
                    }
                })
                executingState.push(first)
            }
        })
*/