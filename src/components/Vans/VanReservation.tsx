import { Range } from "react-date-range";
import Calendar from "../Calendar"

type VanReservationProps = {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabledDates: Date[];
    isLoading: boolean;
}

const VanReservation: React.FC<VanReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
    isLoading,
}) => {
    return (
        <div className="border-neutral-200 border-[1px] rounded-xl bg-white">
            <div className="pl-4 py-3 border-neutral-200 border-b-[1px]">
                <p className="m-0">${price}/day</p>
            </div>
            <Calendar 
                dateRange={dateRange}
                onChangeDate={(value) => onChangeDate(value.selection)}
                disabledDates={disabledDates}
            />
            <div className="px-4 py-3 border-neutral-200 border-y-[1px]">
                <button className="link-button bg-primary-color w-full" onClick={onSubmit} type="submit" disabled={isLoading}>
                    { isLoading 
                    ? 'Renting this van...' 
                    : 'Rent this van'}
                </button>
            </div>
            <div className="flex justify-between px-4 py-3">
                <span>Total</span><span>${totalPrice}</span>
            </div>
        </div>
    )
}

export default VanReservation