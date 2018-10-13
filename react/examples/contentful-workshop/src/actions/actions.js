export function setBusy(busy) {
    return {
        type: 'SET_BUSY',
        data: {
            busy
        }
    }
}

export function storeResult(result) {
    return {
        type: 'STORE_RESULT',
        data: result
    }
}