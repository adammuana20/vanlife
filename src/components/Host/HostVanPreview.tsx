import React from "react";
import { NavLink, Link, Outlet, useLoaderData, defer, Await, LoaderFunctionArgs } from "react-router-dom";
import { Van, getVan } from "../../utils/firebase";
import { requireAuth } from "../../utils/loaders";
import { User } from "firebase/auth";
import { TypedParams } from "../Vans/VanPreview";
import HostVanDetail from "./HostVanDetail";

export const loader = (currentUser: User | null) => async({ request, params }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)
    return defer({ hostVan: getVan((params as TypedParams).id) })
}


const HostVanPreview = () => {
    const { hostVan } = useLoaderData() as { hostVan: Van }
    
    return (
        <section className="mx-6">
            <Link
                to=".."
                relative="path"
                className="text-black hover:underline"
            >&larr; <span>Back to all vans</span>
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