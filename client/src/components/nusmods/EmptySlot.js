import React, { useContext, useState, useEffect } from 'react';
import SearchContext from '../../context/search/searchContext';

const EmptySlot = ({ startTime, endTime, day }) => {
    const searchContext = useContext(SearchContext);

    const { addTimeFilter, deleteTimeFilter, timeFilter } = searchContext;

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        let dayIndex;
        switch (day) {
            case 'Monday':
                dayIndex = 0;
                break;
            case 'Tuesday':
                dayIndex = 1;
                break;
            case 'Wednesday':
                dayIndex = 2;
                break;
            case 'Thursday':
                dayIndex = 3;
                break;
            case 'Friday':
                dayIndex = 4;
                break;
            default:
                dayIndex = -1;
        }

        if (timeFilter[dayIndex].startTime.length === 0) {
            setSelected(false);
        } else {
            timeFilter[dayIndex].startTime.forEach((filterStartTime, index) => {
                if (
                    filterStartTime > startTime &&
                    timeFilter[dayIndex].endTime[index] < endTime
                )
                    setSelected(false);
            });
        }
    }, [JSON.stringify(timeFilter)]);

    const onClick = () => {
        setSelected(!selected);
        console.log(`${day}, ${startTime} - ${endTime}`);
        selected
            ? deleteTimeFilter(day, startTime, endTime)
            : addTimeFilter(day, startTime, endTime);
    };
    return (
        <div>
            <button
                className={`btn-module module-empty${
                    selected ? '-selected' : ''
                }`}
                onClick={onClick}
            >
                add timing to search
            </button>
        </div>
    );
};

export default EmptySlot;
