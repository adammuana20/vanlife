import HomeHeading from './HomeHeading'
import Steps from './Steps'

import howItWorks from '../../assets/images/how-it-works.png'

const HowItWorks = () => {
  return (
    <div className='py-10 md:py-24 max-w-screen-xl mx-auto flex flex-col gap-20'>
        <div className='flex gap-10 sm:gap-20 flex-col md:flex-row'>
          <div className='w-full md:w-1/2 pl-5 pr-5'>
            <div className='rounded-xl overflow-hidden shadow-lg w-full'>
                <img src={howItWorks} alt="Success Reserving a Van" />
            </div>
          </div>
          <div className='pl-5 md:pl-0 md:pr-5 w-full md:w-1/2 flex flex-col justify-center'>
            <HomeHeading 
                title="HOW IT WORKS"
                subtitle="How to Rent a Van in 3 Easy Steps"
            />
            <p className='text-center sm:text-start'>Lorem ipsum dolor sit amet, consectetur adipiscing elit elit tellus, luctus nec ullamc mattis pulvi dapibus cras risus dui euismod et sapien.</p>
              <Steps
                step="01"
                title="Choose Your Van"
                subtitle="Lorem ipsum dolor sit amet consecte adipiscing elit ut elit tellus luctus nec tellus ullamcorper."
              />
              <Steps
                step="02"
                title="Book Your Rental"
                subtitle="Lorem ipsum dolor sit amet consecte adipiscing elit ut elit tellus luctus nec tellus ullamcorper."
              />
              <Steps
                step="03"
                title="Pick Up and Go"
                subtitle="Lorem ipsum dolor sit amet consecte adipiscing elit ut elit tellus luctus nec tellus ullamcorper."
              />
          </div>
        </div>
    </div>
  )
}

export default HowItWorks