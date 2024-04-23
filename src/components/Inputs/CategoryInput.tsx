import { capitalizeEachWord } from "../../utils/helpers";

type CategoryInputProps = {
    onClick: (value: string) => void;
    label: string;
    selected?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    label,
    selected,
    onClick,
}) => {
  return (
    <div
        onClick={() => onClick(label)}
        className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
        `}
    >
        <div className="font-semibold">
            {capitalizeEachWord(label)}
        </div>
    </div>
  )
}

export default CategoryInput