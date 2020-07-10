import React from "react";

const LoadingIndicator = () => {
    return (
        <div className="p-3 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingIndicator;