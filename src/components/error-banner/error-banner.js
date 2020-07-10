import React from "react";
import image from "./error-banner.png"

const ErrorBanner = ({details}) => {

    const errorDetails = !details ? null : (
        <React.Fragment>
            <hr/>
            <p className="mb-0 text-muted">Error details: {details}</p>
        </React.Fragment>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 alert alert-danger p-5 my-1 text-center" role="alert">
                    <img src={image} alt="" width="100" className="mb-4"/>
                    <h4 className="alert-heading">Some error happened!</h4>
                    <p>Oops... Looks like something went wrong.</p>
                    {errorDetails}
                </div>
            </div>
        </div>
    )
};

export default ErrorBanner;