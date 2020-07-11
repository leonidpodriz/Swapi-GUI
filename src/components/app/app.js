import React from "react";

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import DetailsList from "../details-list";
import {FilmsPage} from "../pages";
import Header from "../header";
import Container from "../container";


const App = () => {
    return (
        <Router>
            <Container>
                <Header/>
                <Route path="/" exact component={FilmsPage} />
                <Route path={"/:entity/:id"} component={DetailsList} />
                <Route render={() => <Redirect to="/" />}/>
            </Container>
        </Router>
    )
}

export default App;
