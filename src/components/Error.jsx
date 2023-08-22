import React from "react";
import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError()

    return (
        <>
            <h1>Error: {error.message ? error.message : `Test`}</h1>
            <pre>{error.status} - {error.statusText}</pre>
        </>
    )
}