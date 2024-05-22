import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";


const Home = () => {
    return (
        <>
            <Hero 
                title="You Got The Travel Plans, We Got The Travel Vans"
                subtitle="Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip."
                ctaLabel="FIND YOUR VAN"
                path="vans"
            />
            <div className="bg-white">
                <Features />
            </div>
            <HowItWorks />
        </>
    )
};

export default Home