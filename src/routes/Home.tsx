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

            {/* <div className="flex items-center justify-center max-w-screen-2xl mx-auto">
                <div>
                    <img src={bgImg} />
                </div>
                <div>
                    <div className="px-6 text-semi-black mb-28">
                        <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
                        <p className="leading-5 text-lg">Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉)</p>
                        <p className="leading-5">Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                    </div>
                    <div className="text-semi-black px-8 pb-8 mx-7 rounded bg-[#FFCC8D]">
                        <h2 className="m-0 py-9">Your destination is waiting.<br />Your van is ready.</h2>
                        <Link className="link-button" to="/vans">Explore our vans</Link>
                    </div>
                </div>
            </div> */}
        </>
    )
};

export default Home