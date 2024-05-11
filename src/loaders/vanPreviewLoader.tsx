import { ParamParseKey, LoaderFunctionArgs, defer } from "react-router-dom";
import { getVan, getVanReservationsDocuments, getFavorite } from "../utils/firebase";

const VANS_ROUTE = '/vans/:id';

let VanPreview: React.ComponentType<any>;

export type TypedParams = Record<ParamParseKey<typeof VANS_ROUTE>, string>;

export const loader = async ({ params }: LoaderFunctionArgs) => {
    let controller = new AbortController()

    import("../components/Vans/VanPreview").then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                VanPreview = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading VanPreview component:", error);
        controller.abort()
    });

    try {
        return defer({ 
            van: getVan((params as TypedParams).id), 
            reservations: getVanReservationsDocuments((params as TypedParams).id), 
            favorites: getFavorite((params as TypedParams).id) 
        })
    } finally {
        controller.abort()
    }
}