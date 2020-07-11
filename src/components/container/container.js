import React from "react";

const Container = ({children}) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-9 col-lg-5">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Container;