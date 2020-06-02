export const setSelectedArray = amount => {
    const selectedArray = []
    for (let i = 0; i < amount; i++) {
        selectedArray.push(false)
    }
    return selectedArray
}

export const selectCurrentFunction = (previousState, index) => {
    return previousState.selectedArray.map((bool, i) => (i == index) ? true : false)
}

export const cancelSelection = previousState => {
    return previousState.selectedArray.map(bool => bool = false)
}