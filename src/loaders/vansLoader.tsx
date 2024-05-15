import { defer } from "react-router-dom";
import { getVansDocuments, getFavorites } from "../utils/firebase";

let Vans: React.ComponentType<any>;

export async function loader ({ request }: { request: Request }) {
    import('../routes/Vans').then(
        (componentModule) => {
            if(!request.signal.aborted) {
                Vans = componentModule.default
            }
        }
    ).catch((error) => {
        console.error("Error loading Vans component:", error);
        request.signal.aborted
    });

    try {
        return defer({ vans: getVansDocuments(), favorites: getFavorites() })
    } finally {
        request.signal.aborted
    }
}