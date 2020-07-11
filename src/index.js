// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from "./components/app";
import {SwapiServiceProvider} from "./components/films-service-context/films-service-context";
import ErrorBoundary from "./components/error-boundary";

// Redux
import {Provider} from "react-redux";
import store from "./store";

// Services
import {SwapiService} from "./services";

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';


const swapiService = new SwapiService()


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <SwapiServiceProvider value={swapiService}>
                <App/>
            </SwapiServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);