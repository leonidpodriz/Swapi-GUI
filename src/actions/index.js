export const fetchAllFilmsRequest = () => {
    return {type: "FETCH_ALL_FILMS_REQUEST"}
}
export const fetchAllFilmsFailure = () => {
    return {type: "FETCH_ALL_FILMS_FAILURE"}
}
export const fetchAllFilmsSuccess = (films) => {
    return {
        type: "FETCH_ALL_FILMS_SUCCESS",
        payload: films,
    }
}

export const fetchFilms = (service, dispatch) => {
    dispatch(fetchAllFilmsRequest());
    service.getEntity("films")
        .then((films) => dispatch(fetchAllFilmsSuccess(films)))
        .catch((error) => dispatch(fetchAllFilmsFailure(error)));
}

export const fetchEntityRequest = (entity, id) => {
    return {
        type: "FETCH_ENTITY_REQUEST",
        payload: {entity, id}
    }
}
export const fetchEntitySuccess = (entity, id, data) => {
    return {
        type: "FETCH_ENTITY_SUCCESS",
        payload: {entity, id, data}
    }
}

export const fetchEntityFailure = (entity, id, error) => {
    return {
        type: "FETCH_ENTITY_FAILURE",
        payload: {entity, id, error}
    }
}

export const fetchEntity = (service, dispatch, entity, id) => {
    dispatch(fetchEntityRequest(entity, id));
    service.getEntity(entity, {id})
        .then(data => dispatch(fetchEntitySuccess(entity, id, data)))
        .catch(error => dispatch(fetchEntityFailure(entity, id, error)));
}