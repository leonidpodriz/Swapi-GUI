import React from "react";

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {FilmsPage, DetailsPage} from "../pages";
import Container from "../container";
import Header from "../header";

const baseUrl = process.env.NODE_ENV !== 'development' ? "/" : "/Swapi-GUI";

const App = () => {
    return (
        <Router basename={baseUrl}>
            <Container>
                <Header/>
                <Switch>
                    <Route path={"/"} exact component={FilmsPage} />
                    <Route path={"/:entity/:id"} component={DetailsPage} />
                    <Route render={() => <Redirect to="/" />}/>
                </Switch>
            </Container>
        </Router>
    )
}

export default App;
