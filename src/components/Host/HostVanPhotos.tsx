import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/firebase";

const HostVanPhotos = () => {
    const { currentVan }: { currentVan: Van } = useOutletContext();

    return (
        <img src={currentVan.imageUrl} className="h-24 rounded" />
    )
}

export default HostVanPhotos