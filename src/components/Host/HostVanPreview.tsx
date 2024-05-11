import React from "react";
import { Link, useLoaderData, defer, Await, LoaderFunctionArgs } from "react-router-dom";
import HostVanDetail from "./HostVanDetail";

import { Van } from "../../utils/firebase";

const HostVanPreview = () => {
    const { hostVan } = useLoaderData() as { hostVan: Van }
    
    return (
        <section className="mx-6">
            <Link
                to=".."
                relative="path"
                className="text-black hover:underline"
            >&larr; <span>Back to hosted vans</span>
            </Link>
            <React.Suspense fallback={<h3>Loading van...</h3>}>
                <Await resolve={hostVan}>
                    <HostVanDetail />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default HostVanPreview