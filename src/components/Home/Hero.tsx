import { Link } from "react-router-dom"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay, EffectFade } from "swiper/modules";

import hero1 from '../../assets/images/home-hero.png'
import hero2 from '../../assets/images/about-hero.png'
import hero3 from '../../assets/images/hero3.png'

import "swiper/css";
import 'swiper/css/effect-fade';

type HeroProps = {
    title: string;
    subtitle: string;
    ctaLabel: string;
    path: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaLabel, path }) => {
  return (
    <div className="text-white relative h-screen">
        <div className="absolute h-full w-full z-0 swiper-scale-effect">
            <Swiper     
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 3000,
                }}
                speed={2000}
                noSwiping={true}
                noSwipingClass="no-swiping"
                fadeEffect={{ crossFade: true }}
                direction="horizontal"
            >
                <SwiperSlide className="no-swiping">
                    {({isActive}) => (
                        <div 
                        className={`h-screen swiper-slide-cover ${isActive ? 'zoomed' : ''}`}
                        style={{ 
                            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.46)), url(${hero1}) no-repeat center center`, 
                            backgroundSize: 'cover',
                        }}
                        >
                        </div>
                    )}
                </SwiperSlide>
                <SwiperSlide className="no-swiping">
                {({isActive}) => (
                        <div 
                        className={`h-screen swiper-slide-cover ${isActive ? 'zoomed' : ''}`}
                        style={{ 
                            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.46)), url(${hero2}) no-repeat center center`, 
                            backgroundSize: 'cover',
                        }}
                        >
                        </div>
                    )}
                </SwiperSlide>
                <SwiperSlide className="no-swiping">
                {({isActive}) => (
                        <div 
                        className={`h-screen swiper-slide-cover ${isActive ? 'zoomed' : ''}`}
                        style={{ 
                            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.46), rgba(0, 0, 0, 0.46)), url(${hero3}) no-repeat center center`, 
                            backgroundSize: 'cover',
                        }}
                        >
                        </div>
                    )}
                </SwiperSlide>
            </Swiper>
        </div>
        <div className="max-w-screen-lg mx-auto flex flex-col justify-center items-center h-full gap-5 px-[1rem] md:px-[5rem] z-10 relative">
            <h1 className="font-extrabold text-center">{title}</h1>
            <p className="text-center">{subtitle}</p>
            <div className="flex">
                <Link 
                    to={path}
                    className="
                        w-[12rem]
                        bg-primary-color
                        py-2.5 
                        rounded-lg 
                        text-center
                        border-primary-color 
                        hover:bg-light-orange
                        text-white
                        mb-5
                    "
                >
                    {ctaLabel}
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Hero