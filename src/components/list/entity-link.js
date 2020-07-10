import {Link} from "react-router-dom";
import React from "react";

const EntityLink = ({entity, id, text}) => {
    return <Link className="badge text-white mr-1 badge-primary" to={"/" + entity + "/" + id}>{text}</Link>
};

export default EntityLink;