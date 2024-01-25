import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/firebase";

export default function HostVanPricing() {
    const { currentVan }: { currentVan: Van } = useOutletContext();

    return (
        <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    )
}