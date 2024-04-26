import { Range } from "react-date-range";
import Calendar from "../Calendar"
import Button from "../Button";

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
                <p className="m-0"><span className="font-semibold text-xl">${price}</span>/day</p>
            </div>
            <Calendar 
                dateRange={dateRange}
                onChangeDate={(value) => onChangeDate(value.selection)}
                disabledDates={disabledDates}
            />
            <div className="px-4 py-3 border-neutral-200 border-y-[1px]">
                {/* <button className="link-button bg-primary-color w-full" onClick={onSubmit} type="submit" disabled={isLoading}>
                    { isLoading 
                    ? 'Renting this van...' 
                    : 'Rent this van'}
                </button> */}
                <Button 
                    label="Rent this van"
                    onClick={onSubmit}
                    disabled={isLoading}
                    disabledLabel="Renting this van.."
                />
            </div>
            <div className="flex justify-between px-4 py-3">
                <span className="font-semibold">Total</span><span className="font-semibold">${totalPrice}</span>
            </div>
        </div>
    )
}

export default VanReservation