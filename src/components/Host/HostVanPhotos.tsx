import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/firebase";

export default function HostVanPhotos() {
    const { currentVan }: { currentVan: Van } = useOutletContext();

    return (
        <img src={currentVan.imageUrl} className="host-van-detail-image" />
    )
}