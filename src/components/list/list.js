import React from "react";
import withSwapiService from "../hoc/with-swapi-service";
import {Link} from "react-router-dom";
import SwapiService from "../../services/swapi-service";
const swapiService = new SwapiService();


const StringListItem = ({key_, value}) => {
    return (
        <li className="list-group-item"><strong>{key_}</strong>: {value}</li>
    )

}

const EntityLink = ({entity, id, text}) => {
    return <Link className="badge text-white mr-1 badge-primary" to={"/" + entity + "/" + id}>{text}</Link>
};

class EntityListItem extends React.Component {
    state = {
        text: "Loading...",
        id: null,
        entity: null,
    }

    getDataByParams = () => {
        const {entity, id=null} = this.props;
        swapiService.getEntity(entity, {id})
            .then( data => {
                this.setState({
                    text:Object.values(data)[0],
                    id,
                    entity,
                })
            });
    }

    componentDidMount() {
        this.getDataByParams();
    }

    render() {
        const {entity, id, text="Loading..."} = this.state;

        return <EntityLink entity={entity} id={id} text={text}/>
    }
}

const renderEntityListItems = (value) => {
    const {entity, id} = value;
    return <EntityListItem entity={entity} id={id}/>
}

const renderEntity = (value) => {
    const {entity, id} = value;
    return <EntityLink entity={entity} id={id}/>
}

const keyNameProcess = (keyName) => {
    keyName = keyName[0].toUpperCase() + keyName.slice(1);
    return keyName.replace("_", " ")
}


class List extends React.Component {
    state = {
        items: [],
    }

    getDataByParams = () => {
        const {entity, id=null} = this.props.match.params;
        this.props.swapiService.getEntity(entity, {id})
            .then( data => this.setState({items: data}));
    }

    componentDidMount() {
        this.getDataByParams();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) this.getDataByParams();
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
            value = renderEntity(value);
        }

        return <StringListItem value={value} key_={key}/>;
    }

    render() {
        const {items} = this.state;
        const processedItems = Object.entries(items).map(this.renderItem);

        return (
            <ul className="list-group list-group-flush">
                {processedItems}
            </ul>
        );
    }
}

export default withSwapiService()(List);