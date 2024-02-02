import React, { useState } from "react"
import { Link, useLocation, useLoaderData, defer, Await, LoaderFunctionArgs, ParamParseKey } from "react-router-dom";
import VanDetail from "./VanDetail";

import { Van, getVan } from "../../utils/firebase"

const VANS_ROUTE = '/vans/:id';

export type TypedParams = Record<ParamParseKey<typeof VANS_ROUTE>, string>;

export const loader = ({ params }: LoaderFunctionArgs) => {
    return defer({van: getVan((params as TypedParams).id) })
}

const VanPreview = () => {
    const location = useLocation()
    const { van } = useLoaderData() as { van: Van }
    
    const search = location.state?.search || "";
    const type = location.state?.type || "all";

    return (
        <div className="px-7">
            <Link
                to={`..${search}`}
                relative="path"
                className="text-black hover:underline"
            >
                &larr; <span>Back to {type} vans</span>
            </Link>
            <React.Suspense fallback={<h3>Loading van...</h3>}>
                <Await resolve={van}>
                    <VanDetail />
                </Await>
            </React.Suspense>
        </div>
    )
}

export default VanPreview