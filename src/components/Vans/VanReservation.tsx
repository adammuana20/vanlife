import { Range } from "react-date-range";
import Calendar from "../Calendar"

type VanReservationProps = {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    dateRange: Range;
    onSubmit: () => void;
    disabledDates: Date[];
}

const VanReservation: React.FC<VanReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabledDates,
}) => {
    return (
        <div>
            <p>${price}/day</p>
            <Calendar 
                dateRange={dateRange}
                onChangeDate={(value) => onChangeDate(value.selection)}
                disabledDates={disabledDates}
            />
            <p>Total: ${totalPrice}</p>
            <button className="link-button bg-primary-color" onClick={onSubmit}>Rent this van</button>
        </div>
    )
}

export default VanReservation