import React from "react";
import { NavLink, Link, Outlet, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans, getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
    await requireAuth(request)
    return defer({ hostVan: getVan(params.id) })
}


export default function VanDetail() {
    const dataPromise = useLoaderData()
    
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    function renderVanElement(currentVan) {
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
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Details</NavLink>
                    <NavLink 
                        to={"pricing"} 
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Pricing</NavLink>
                    <NavLink 
                        to={"photos"} 
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >Photos</NavLink>
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
                <Await resolve={dataPromise.hostVan}>
                    {renderVanElement}
                </Await>
            </React.Suspense>
        </section>
    )
}