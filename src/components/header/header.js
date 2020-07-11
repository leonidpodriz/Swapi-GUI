import React from "react";
import "./header.css";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-dark text-light px-2 py-3 mb-4" id="header">
            <h1 className="text-center">StarWars Films</h1>
            <p className="text-center"><Link to="/" className="text-muted">back to homepage</Link></p>
        </div>
    )
}

export default Header;