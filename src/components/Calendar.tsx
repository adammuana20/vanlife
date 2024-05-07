import { DateRange, RangeKeyDict, Range } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file


type CalendarProps = {
    dateRange: Range;
    onChangeDate: (value: RangeKeyDict) => void;
    disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
    dateRange,
    onChangeDate,
    disabledDates
}) => {
    
    return (
        <DateRange
            ranges={[dateRange]}
            onChange={onChangeDate}
            minDate={new Date()}
            showDateDisplay={false}
            disabledDates={disabledDates}
        />
    )
}

export default Calendar