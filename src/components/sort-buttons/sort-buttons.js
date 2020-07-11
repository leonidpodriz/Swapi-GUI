import React from "react";

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

export default SortButtons;