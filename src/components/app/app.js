import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import DetailsList from "../details-list";
import {FilmsPage} from "../pages";
import Header from "../header";


const App = () => {
    return (
        <Router>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-5">
                        <Header/>

                        <Route path="/" exact>
                            <FilmsPage/>
                        </Route>
                        <Route path={document.location.pathname + ":entity/:id"} component={DetailsList}/>
                    </div>
                </div>
            </div>
        </Router>
    )
}

export default App;
