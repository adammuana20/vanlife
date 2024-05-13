import { Link } from "react-router-dom"


const Home = () => {
    return (
        <div 
            className={`h-[22rem] text-white px-6 py-11 home-hero`}
        >
            <h1>You got the travel plans, we got the travel vans.</h1>
            <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
            <div className="flex justify-center items-center">
                <Link 
                    to="vans"
                    className="
                    w-1/2
                    bg-primary-color
                    py-2 
                    mt-7 
                    rounded-lg 
                    text-center 
                    border-[1px] 
                    border-primary-color 
                    hover:bg-white 
                    text-white"
                >
                    Find your van
                </Link>
            </div>
        </div>
    )
};

export default Home