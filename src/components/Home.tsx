import { Link } from "react-router-dom"


const Home = () => {
    return (
        <div 
            className={`h-[22rem] text-white px-6 py-11 home-hero`}
        >
            <h1>You got the travel plans, we got the travel vans.</h1>
            <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
            <Link to="vans" className="btn">Find your van</Link>
        </div>
    )
};

export default Home