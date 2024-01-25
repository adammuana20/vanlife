import React from "react";
import { Link, useLocation, useLoaderData, defer, Await, LoaderFunctionArgs, ParamParseKey } from "react-router-dom";
import { getVan } from "../../utils/firebase"

const VANS_ROUTE = '/vans/:id';

export type TypedParams = Record<ParamParseKey<typeof VANS_ROUTE>, string>;

export function loader({ params }: LoaderFunctionArgs) {
    return defer({van: getVan((params as TypedParams).id) })
}

const VanPreview = () => {
    const location = useLocation()
    const dataPromise = useLoaderData();

    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span>
            </Link>
            <React.Suspense fallback={<h2>Loading van...</h2>}>
                <Await resolve={dataPromise?.van}>
                    {(van) => {
                        return (
                            <div className="van-detail">
                                <img src={van.imageUrl} />
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                <h2>{van.name}</h2>
                                <p className="van-price"><span>${van.price}</span>/day</p>
                                <p>{van.description}</p>
                                <button className="link-button">Rent this van</button>
                            </div>
                        )
                    }}
                </Await>
            </React.Suspense>
        </div>
    )
}

export default VanPreview