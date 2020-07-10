import React from "react";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import DetailsList from "../details-list";
import FilmList from "../film-list";
class App extends React.Component {
    render() {
        return (
            <Router>
                <h1 className="text-center py-5"><Link to="/">Swapi GUI</Link></h1>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-9 col-lg-5">
                            <Route path="/" exact>
                                <FilmList/>
                            </Route>
                            <Route path="/:entity/:id" component={DetailsList}/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;
