import { Link } from "react-router-dom"

type HeroProps = {
    title: string;
    subtitle: string;
    ctaLabel: string;
    path: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, ctaLabel, path }) => {
  return (
    <div className="text-white home-hero">
        <div className="max-w-screen-lg mx-auto flex flex-col justify-center items-center h-full gap-5 px-[1rem] md:px-[5rem]">
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