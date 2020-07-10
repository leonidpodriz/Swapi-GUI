export const fetchAllFilmsRequest = () => {
    return {type: "FETCH_ALL_FILMS_REQUEST"}
}

export const fetchAllFilmsSuccess = (films) => {
    return {type: "FETCH_ALL_FILMS_SUCCESS", payload: films}
}

export const fetchAllFilmsFailure = (error) => {
    return {type: "FETCH_ALL_FILMS_FAILURE", payload: error}
}

export const fetchPartOfPeopleRequest = () => {
    return {type: "FETCH_PART_OF_PEOPLE_REQUEST"}
}

export const fetchPartOfPeopleSuccess = (films) => {
    return {type: "FETCH_PART_OF_PEOPLE_SUCCESS", payload: films}
}

export const fetchPartOfPeopleFailure = (error) => {
    return {type: "FETCH_PART_OF_PEOPLE_FAILURE", payload: error}
}

export const getData = (swapiService, dispatch, entity, id) => {
    switch (entity) {
        case "films":
            dispatch(fetchAllFilmsRequest());
            swapiService.getEntity(entity, {id})
                .then(data=>dispatch(fetchAllFilmsSuccess(data)))
                .catch(error=>dispatch(fetchAllFilmsFailure(error)));
            return true;
        case "people":
            dispatch(fetchPartOfPeopleRequest());
            swapiService.getEntity(entity, {id})
                .then(data=>dispatch(fetchPartOfPeopleSuccess(data)))
                .catch(error=>dispatch(fetchPartOfPeopleFailure(error)));
            return true;
        default:
            return false;
    }
};