import React from "react";
import { NavLink, Link, Outlet, useLoaderData, defer, Await, LoaderFunctionArgs } from "react-router-dom";
import { Van, getVan } from "../../utils/firebase";
import { requireAuth } from "../../utils/loaders";
import { User } from "firebase/auth";
import { TypedParams } from "../Vans/VanDetail";

export const loader = (currentUser: User | null) => async({ request, params }: LoaderFunctionArgs) => {
    await requireAuth(request, currentUser)
    return defer({ hostVan: getVan((params as TypedParams).id) })
}


const VanDetail = () => {
    const { hostVan } = useLoaderData() as { hostVan: Van }
    
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    const renderVanElement = (currentVan: Van) => {
        return(
            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
                        <h3>{currentVan.name}</h3>
                        <h4>{currentVan.price}</h4>
                    </div>
                </div>
            

                <nav className="host-van-detail-nav">
                    <NavLink 
                        to="." 
                        end 
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                    >
                        Details
                    </NavLink>
                    <NavLink 
                        to={"pricing"} 
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                    >
                        Pricing
                    </NavLink>
                    <NavLink 
                        to={"photos"} 
                        style={({ isActive }) => isActive ? activeStyles : undefined}
                    >
                        Photos
                    </NavLink>
                </nav>
                <Outlet context={{ currentVan }} />
            </div>
        )
    }
    
    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span>
            </Link>
            <React.Suspense fallback={<h2>Loading van...</h2>}>
                <Await resolve={hostVan}>
                    {renderVanElement}
                </Await>
            </React.Suspense>
        </section>
    )
}

export default VanDetail