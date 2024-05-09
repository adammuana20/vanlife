import { IconType } from "react-icons";

type ButtonProps = {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
    disabledLabel?: string;
    type?: 'submit' | 'reset' | 'button' | undefined,
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon,
    disabledLabel = '',
    type = 'button',
}) => {        
  return (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? 'bg-white' : 'bg-primary-color'}
            ${outline ? 'border-black' : 'bg-primary-color'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-[2px]'}
        `}
    >
        {Icon && (
            <Icon 
                size={24}
                className="
                    absolute
                    left-4
                    top-3
                "
            />
        )}
        { disabled 
            ? disabledLabel !== '' 
                ? disabledLabel
                : label
            : label
        }
    </button>
  )
}

export default Button