import React from "react";
import {Link} from "react-router-dom";
import withSwapiService from "../hoc/with-swapi-service";
import {connect} from "react-redux";
import {fetchFilms} from "../../actions";
import ErrorBanner from "../error-banner";
import LoadingIndicator from "../loading-indicator";
import {compose} from "redux";

const FilmList = ({films}) => {
    return (
        <div className="list-group">
            {
                films.map(film => {
                    const {id} = film.url;
                    const url = "/films/" + id;
                    return <Link to={url}
                                 className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">{film.title}
                        <span className="badge badge-primary badge-pill">Episode: {film.episode_id}</span>
                    </Link>;
                })
            }
        </div>
    )
}

class FilmListContainer extends React.Component {

    componentDidMount() {
        const {getFilms, films} = this.props;
        if (!films.data.length) getFilms();
    }

    render() {
        const {loading, data, hasError} = this.props.films;

        if (hasError) return <ErrorBanner details="Film load failure"/>;
        if (loading) return <LoadingIndicator/>;

        return <FilmList films={data}/>;
    }
}

const mapStateToProps = ({films}) => {
    return {
        films,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {swapiService} = ownProps;

    return {
        getFilms: () => fetchFilms(swapiService, dispatch)
    }
}

export default compose(
    withSwapiService(),
    connect(mapStateToProps, mapDispatchToProps)
)((FilmListContainer));