import { Link, useNavigate } from "react-router-dom";
import Heading from "./Heading";
import Button from "./Button";

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div
        className='
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
        '
    >
            <Heading 
                title="Something went wrong!"
                subtitle="The page you were looking for is not found!"
                center
            />
            <div className='w-48 mt-4'>
            <Button 
                label="Return to Home"
                outline
                onClick={() => navigate('/')}
            />
            </div>
    </div>
    )
}

export default NotFound