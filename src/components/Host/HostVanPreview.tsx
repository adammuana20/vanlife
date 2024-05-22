import React from "react";
import { Link, useLoaderData, Await } from "react-router-dom";

import HostVanDetail from "./HostVanDetail";
import SkeletonHostVanPreview from "../Skeletons/Host/SkeletonHostVanPreview";

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
            <React.Suspense fallback={<SkeletonHostVanPreview />}>
                <Await resolve={hostVan}>
                    <HostVanDetail />
                </Await>
            </React.Suspense>
        </section>
    )
}

export default HostVanPreview