import React from "react";
import {Link} from "react-router-dom";

const FilmList = ({films}) => {
    return (
        <div className="list-group">
            {
                films.map(film => {
                    const {id} = film.url;
                    const url = "/films/" + id;
                    return (
                        <Link to={url}
                              key={film.episode_id}
                              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                            {film.title}
                            <span className="badge badge-primary badge-pill">Episode: {film.episode_id}</span>
                        </Link>
                    );
                })
            }
        </div>
    )
}

export default FilmList;