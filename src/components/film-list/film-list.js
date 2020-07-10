import React from "react";
import SwapiService from "../../services/swapi-service";
import {Link} from "react-router-dom";

const swapiService = new SwapiService();

class FilmList extends React.Component {
    state = {
        films: [],
        loading: true,
        hasError: false,
    }

    componentDidMount() {
        swapiService.getEntity("films").then( data => {
            this.setState({films: data, loading: false})
        })
    }

    render() {
        const {loading, films, hasError} = this.state;
        if (loading) return <p>Loading...</p>
        return (
            <div className="list-group">
                {
                    films.map( film => {
                        const  {id} = film.url;
                        const url = "/films/" + id;
                        return <Link to={url} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">{film.title}
                            <span className="badge badge-primary badge-pill">Episode: {film.episode_id}</span>
                        </Link>;
                    })
                }
            </div>
        )
    }
}

export default FilmList;