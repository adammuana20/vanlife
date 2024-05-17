import { IconType } from "react-icons";

type FeatureCardProps = {
    Icon: IconType;
    title: string;
    subtitle: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ Icon, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center text-center px-9 gap-4">
        <Icon className="text-primary-color" size={60} />
        <h4>{title}</h4>
        <p className="leading-7 text-lg font-thin">{subtitle}</p>
    </div>
  )
}

export default FeatureCard