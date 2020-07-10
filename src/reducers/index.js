const initialState = {
    films: {
        loading: true,
        hasError: false,
        data: []
    },
    people: {
        loading: true,
        hasError: false,
        data: []
    },
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;