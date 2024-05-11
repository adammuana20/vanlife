import { defer } from "react-router-dom";
import { getVansDocuments, getFavorites } from "../utils/firebase";

let Vans: React.ComponentType<any>;

export async function loader () {
    let controller = new AbortController()

    import('../routes/Vans').then(
        (componentModule) => {
            if(!controller.signal.aborted) {
                Vans = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Vans component:", error);
        controller.abort()
    });

    try {
        return defer({ vans: getVansDocuments(), favorites: getFavorites() })
    } finally {
        controller.abort()
    }
}