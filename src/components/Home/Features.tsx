import { MdOutlineHealthAndSafety } from "react-icons/md";
import { PiVanLight } from "react-icons/pi";
import { LiaMapMarkedAltSolid } from "react-icons/lia";
import { GiEcology } from "react-icons/gi";

import FeatureCard from './FeatureCard'
import HomeHeading from "./HomeHeading";


const Features = () => {
  return (
    <div className='max-w-screen-xl mx-auto px-5 py-10 md:py-24 flex flex-col gap-24'>
        <HomeHeading 
            title="KEY FEATURES"
            subtitle="Make Your Trip Your Way With Us"
            center
        />
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center'>
            <FeatureCard 
                Icon={MdOutlineHealthAndSafety}
                title="Safety First"
                subtitle="Each van undergoes regular servicing and safety checks"
            />
            <FeatureCard 
                Icon={PiVanLight}
                title="Reasonable Rates"
                subtitle="We can offer you the right vehicle at the right price to fit your budget"
            />
            <FeatureCard 
                Icon={GiEcology}
                title="Eco-Friendly"
                subtitle="We offer hybrid and electric camper vans for a sustainable travel experience"
            />
            <FeatureCard 
                Icon={LiaMapMarkedAltSolid}
                title="Nationwide Service"
                subtitle="We provide our transportation services nationwide"
            />
            {/* <FeatureCard />
            <FeatureCard />
            <FeatureCard /> */}
        </div>
    </div>
  )
}

export default Features