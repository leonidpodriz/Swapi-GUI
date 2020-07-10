import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app";
import {Provider} from "react-redux";
import store from "./store";
import {SwapiServiceProvider} from "./components/films-service-context/films-service-context";
import {SwapiService} from "./services";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from "./components/error-boundary";


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <SwapiServiceProvider value={new SwapiService()}>
                <App/>
            </SwapiServiceProvider>
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);