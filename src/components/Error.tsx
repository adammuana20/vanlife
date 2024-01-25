import { useRouteError } from "react-router-dom";

type RouteError = {
    message: string;
    status: string;
    statusText: string;
}

const Error = () => {
    const error = useRouteError() as RouteError

    return (
        <>
            { error && (
                <>
                    <h1>Error: {error.message}</h1>
                    <pre>{error.status} - {error.statusText}</pre>
                </>
            )
            }
        </>
    )
}

export default Error