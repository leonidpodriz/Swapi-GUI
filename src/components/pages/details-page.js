import React from "react";

import {connect} from "react-redux"
import {compose} from "redux";
import {fetchEntity} from "../../actions";


import LoadingIndicator from "../loading-indicator";
import ErrorBanner from "../error-banner";
import EntityListItem from "../entity-list/entity-list-item";
import EntityLink from "../entity-list/entity-link";

import withSwapiService from "../hoc/with-swapi-service";


const StringListItem = ({key_, value}) => {
    return (
        <li className="list-group-item"><strong>{key_}</strong>: {value}</li>
    )

}

const renderEntityListItems = (value) => {
    const {entity, id} = value;
    return <EntityListItem key={id} entity={entity} id={id}/>
}

const renderEntity = (value) => {
    const {entity, id} = value;
    return <EntityLink entity={entity} id={id}/>
}

const keyNameProcess = (keyName) => {
    keyName = keyName[0].toUpperCase() + keyName.slice(1);
    return keyName.replace("_", " ")
}


class DetailsPage extends React.Component {
    componentDidMount() {
        this.props.getItems();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.items.length !== prevProps.items.length && this.props.items.length === 0) {
            this.props.getItems();
        }
    }

    renderItem = ([key, value]) => {
        key = keyNameProcess(key);

        if (typeof value === 'object'  && value.type !== 'entity') {
            value = (
                <div>
                    {value.map(renderEntityListItems)}
                </div>
            );
        }
        if (typeof value === 'object'  && value.type === 'entity') {
            console.log(value)
            value = renderEntity(value);
        }

        return <StringListItem value={value} key={key} key_={key}/>;
    }

    render() {
        let {items, loading, hasError} = this.props;

        if (loading) return <LoadingIndicator />;
        if (hasError) return <ErrorBanner/>;

        const processedItems = Object.entries(items).map(this.renderItem);

        return (
            <ul className="list-group list-group-flush">
                {processedItems}
            </ul>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const {entity, id} = ownProps.match.params;
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
    const {entity, id} = ownProps.match.params;

    return {
        getItems: () => fetchEntity(swapiService, dispatch, entity, id),
    }
}

export default compose(
    withSwapiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DetailsPage);