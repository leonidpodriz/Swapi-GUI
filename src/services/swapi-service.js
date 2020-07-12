export default class SwapiService {
    // BASE_URL = "https://swapi.dev/api/";
    // Self hosted swapi mirror: (Original service has invalid certificate: https://github.com/phalt/swapi/issues/152)
    BASE_URL = "https://www.swapi-m.leonidpodriz.com/";

    getData = async (url) => {
        return fetch(url)
            .then((response) => response.json());
    }

    getEntity = async (entity, params = {}) => {
        const {id = null, page = null} = params;
        const entityInUrl = entity + "/";
        const idInUrl = id ? id + '/' : "";
        const pageInUrl = page ? "?page=" + page : "";
        const api_endpoint = this.BASE_URL + entityInUrl + idInUrl + pageInUrl;
        const answer_data = await this.getData(api_endpoint);

        return this._resultParser(answer_data);
    };

    _resultParser = (data) => {
        let result_data;

        if (data.results) {
            result_data = data.results.map(this._listItemParser);
        } else {
            result_data = this._listItemParser(data);
        }

        return result_data;
    };

    _listItemParser = (data) => {
        const data_entries = Object.entries(data)
        const processed_data = data_entries.map(this._singleItemParser)
        return Object.fromEntries(processed_data);
    };

    _singleItemParser = ([key, value]) => {
        let processed_value;

        if (value !== null) {
            if (typeof value === 'object') {
                processed_value = value.map(this._processValue);
            } else {
                processed_value = this._processValue(value);
            }
        }

        return [key, processed_value];
    };

    _isLink = (test_string) => {
        return test_string.match(/^http(s)?:\/\//);
    }

    _processValue = (value) => {
        if (this._isLink(value.toString())) {
            return this._getTypeAndIdFromURL(value);
        }

        return value;
    };

    _getTypeAndIdFromURL(url) {
        const [, entity, , id = null] = url.match(/\/([a-zA-Z]+)\/((\d+)\/)?$/);
        return {
            entity,
            id,
            type: "entity",
        };
    }
}