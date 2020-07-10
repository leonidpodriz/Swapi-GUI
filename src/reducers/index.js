const filmsInitialState = {
    loading: true,
    hasError: false,
    data: []
}

const filmsReducer = (state = filmsInitialState, action) => {
    switch (action.type) {
        case "FETCH_ALL_FILMS_REQUEST":
            return {
                ...state,
                loading: true,
                hasError: false,
            }
        case "FETCH_ALL_FILMS_FAILURE":
            return {
                ...state,
                loading: false,
                hasError: true,
            }
        case "FETCH_ALL_FILMS_SUCCESS":
            return {
                ...state,
                data: action.payload,
                loading: false,
                hasError: false,
            }
        default:
            return state
    }
};

const applyEntityOrCreateNew = (entities, action, params) => {
    const {entity, id} = action.payload;
    const entity_key = [entity, id].join("_");
    const defaultEntity = {
        loading: true,
        hasError: false,
        data: [],
    }
    entities[entity_key] = {
        ...defaultEntity,
        ...entities[entity_key],
        ...params,
    };

    return entities;
}

const entitiesReducer = (state={}, action) => {

    switch (action.type) {
        case "FETCH_ENTITY_REQUEST":
            return applyEntityOrCreateNew(state, action, {loading: true, hasError: false})
        case "FETCH_ENTITY_SUCCESS":
            const {data} = action.payload;
            return applyEntityOrCreateNew(state, action, {loading: false, hasError: false, data})
        case "FETCH_ENTITY_FAILURE":
            return applyEntityOrCreateNew(state, action, {loading: false, hasError: true})
        default:
            return state;
    }
}

const reducer = (state = {}, action) => {
    return {
        films: filmsReducer(state.films, action),
        entities: entitiesReducer(state.entities, action)
    }
}

export default reducer;