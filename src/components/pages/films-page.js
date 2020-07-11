import React from "react";
import FilmList from "../film-list";
import ErrorBanner from "../error-banner";
import LoadingIndicator from "../loading-indicator";
import {fetchFilms} from "../../actions";
import {compose} from "redux";
import withSwapiService from "../hoc/with-swapi-service";
import {connect} from "react-redux";

const prepareToSearch = (value) => {
    return value.toLowerCase().replace(" ", "")
}


const SortButtons = ({callback, sortTypes, active}) => {
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            {
                sortTypes.map((type) => {
                    const className = "btn btn-outline-secondary " + (type === active ? "active" : "");
                    return (
                        <button onClick={() => callback(type)} type="button" data-target="title" className={className}>{type}</button>
                    )
                })
            }
        </div>
    )
}


class FilmsPage extends React.Component {
    state = {
        searchValue: "",
        sortType: "episode",
    }

    sortTypes = {
        title: (film_1, film_2) => film_1.title[0].toLowerCase() > film_2.title[0].toLowerCase() ? 1 : -1,
        episode: (film_1, film_2) => film_1.episode_id > film_2.episode_id ? 1 : -1,
    }

    componentDidMount() {
        const {getFilms, films} = this.props;

        if (!films.data.length) {
            getFilms();
        }
    }

    onSearchValueChange = (event) => {
        this.setState({searchValue: event.target.value})
    }

    onSortTypeChange = (type) => {
        this.setState({sortType: type});
    }

    applySortType = (films) => {
        const {sortType} = this.state;

        if (sortType) {
            return films.sort(this.sortTypes[sortType])
        }

        return films;
    }

    applySearchValue = (films) => {
        return films.filter((film) => {
            const field = prepareToSearch(film.title);
            const searchValue = prepareToSearch(this.state.searchValue);

            return field.includes(searchValue);
        })
    }

    getFilmsList() {
        const {loading, data, hasError} = this.props.films;

        if (hasError) return <ErrorBanner details="Film load failure"/>;
        if (loading) return <LoadingIndicator/>;

        const films = compose(this.applySortType, this.applySearchValue)(data)

        return <FilmList films={films}/>;
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <input onChange={this.onSearchValueChange} type="text" placeholder="Search..."
                           className="form-control mr-3"/>
                    <SortButtons active={this.state.sortType} callback={this.onSortTypeChange} sortTypes={Object.keys(this.sortTypes)}/>
                </div>
                {this.getFilmsList()}
            </div>
        )
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
)((FilmsPage));