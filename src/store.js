import {createStore} from "redux";
import reducer from "./reducers";
import {getData} from "./actions";
import SwapiService from "./services/swapi-service";
const swapiService = new SwapiService();

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__());

// getData(swapiService, store.dispatch, 'films')
// getData(swapiService, store.dispatch, 'people')

export default store;