import React from "react";

import {connect} from "react-redux";
import {compose} from "redux";
import {fetchEntity} from "../../actions";

import EntityLink from "./entity-link";

import withSwapiService from "../hoc/with-swapi-service";


class EntityListItem extends React.Component {
    getDataByParams = () => {
        const {getItems} = this.props;
        getItems();
    }

    componentDidMount() {
        this.getDataByParams();
    }

    render() {
        const {items, loading, hasError} = this.props;
        const {entity, id} = this.props;
        let text = Object.values(items)[0];

        if (loading) text = "Loading..."
        if (hasError) text = "Error"

        return <EntityLink entity={entity} id={id} text={text}/>
    }
}


const mapStateToProps = (state, ownProps) => {
    const {entity, id} = ownProps;
    const entityName = [entity, id].join("_");
    const entityObj = state.entities[entityName] ? state.entities[entityName] : {};
    const {loading=true, hasError=false, data=[]} = entityObj;
    return {
        loading,
        items: data,
        hasError,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {swapiService} = ownProps;
    const {entity, id} = ownProps;

    return {
        getItems: () => fetchEntity(swapiService, dispatch, entity, id),
    }
}

export default compose(
    withSwapiService(),
    connect(mapStateToProps, mapDispatchToProps),
)(EntityListItem)