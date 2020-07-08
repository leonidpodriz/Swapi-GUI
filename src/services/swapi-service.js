export default class SwapiService {
    BASE_URL = "https://swapi.dev/api/";
    FILMS_POSTFIX = "films/"

    getData = async (url) => {
        return fetch(url)
            .then( (response) => response.json() )
    }

    getAllFilms = async () => {
        const {BASE_URL, FILMS_POSTFIX} = this;
        const films_data = await this.getData(BASE_URL + FILMS_POSTFIX)
        return films_data.results;
    }
}
