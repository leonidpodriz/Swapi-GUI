import React from "react";

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {FilmsPage, DetailsPage} from "../pages";
import Header from "../header";
import Container from "../container";

const baseUrl = process.env.NODE_ENV === 'development' ? "/" : "/Swapi-GUI/";

const App = () => {
    return (
        <Router>
            <Container>
                <Header/>
                <Switch>
                    <Route path={baseUrl} exact component={FilmsPage} />
                    <Route path={baseUrl + ":entity/:id"} component={DetailsPage} />
                    <Route render={() => <Redirect to="/" />}/>
                </Switch>
            </Container>
        </Router>
    )
}

export default App;
