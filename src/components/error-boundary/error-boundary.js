import React from "react";
import ErrorBanner from "../error-banner";

export default class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };

    static defaultProps = {
        errorBanner: ErrorBanner,
    }

    componentDidCatch(error, errorInfo) {
       this.setState({hasError: true});
    }

    render() {
        const { hasError } = this.state;
        const { errorBanner, children } = this.props;

        return hasError ? errorBanner : children;
    }
}