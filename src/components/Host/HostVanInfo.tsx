import { useOutletContext } from "react-router-dom";
import { Van } from "../../utils/firebase";

const HostVanInfo = () => {
    const { currentVan }: { currentVan: Van } = useOutletContext();
    
    return (
        <section>
            <h4 className="leading-7">Name: <span className="font-medium">{currentVan.name}</span></h4>
            <h4 className="leading-7">Category: <span className="font-medium">{currentVan.type}</span></h4>
            <h4 className="leading-7">Description: <span className="font-medium">{currentVan.description}</span></h4>
            <h4 className="leading-7">Visibility: <span className="font-medium">Public</span></h4>
        </section>
    )
}

export default HostVanInfo