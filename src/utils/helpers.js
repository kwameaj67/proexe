
export const loadState = () => {
    const state = localStorage.getItem('userData');
    return JSON.parse(state)
}

export const saveObjectState = (object,state) => {
    try {
        state.push(object)
        const jsonSerializer = JSON.stringify(state)
        localStorage.setItem('userData', jsonSerializer);
    } catch (err) {

    }
}
export const saveArrayState = (state) => {
    try {
        const jsonSerializer = JSON.stringify(state)
        localStorage.setItem('userData', jsonSerializer);
    } catch (err) {

    }
}