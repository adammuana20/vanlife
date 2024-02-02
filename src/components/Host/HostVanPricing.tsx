import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/firebase";

const HostVanPricing = () => {
    const { currentVan }: { currentVan: Van } = useOutletContext();

    return (
        <h3>${currentVan.price}<span className="text-dark-gray">/day</span></h3>
    )
}

export default HostVanPricing