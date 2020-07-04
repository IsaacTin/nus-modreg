import React, { useContext } from 'react';
import SearchContext from '../../context/search/searchContext';

const TimeFilters = () => {
    const searchContext = useContext(SearchContext);
    const { timeFilter } = searchContext;

    const convertDayFromIndex = (index) => {
        switch (index) {
            case 0:
                return 'Monday';
            case 1:
                return 'Tuesday';
            case 2:
                return 'Wednesday';
            case 3:
                return 'Thursday';
            case 4:
                return 'Friday';
            default:
                return '';
        }
    };

    return (
        <div className='grid-4'>
            Time Filters
            <br />
            {timeFilter
                .map((dayFilter) =>
                    dayFilter.startTime.length > 0 ? dayFilter : null
                )
                .map((dayFilter, dfIndex) => {
                    if (dayFilter !== null) {
                        return (
                            <div key={dfIndex} className='card'>
                                {`${convertDayFromIndex(
                                    dfIndex
                                )}: ${dayFilter.startTime.map(
                                    (slotStartTime, slotIndex) => {
                                        return `${slotStartTime} - ${dayFilter.endTime[slotIndex]}`;
                                    }
                                )}`}
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
        </div>
    );
};

export default TimeFilters;
