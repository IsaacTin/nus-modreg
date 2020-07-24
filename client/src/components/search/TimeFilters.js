import React, { useContext, Fragment } from 'react';
import SearchContext from '../../context/search/searchContext';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const TimeFilters = () => {
    const searchContext = useContext(SearchContext);
    const {
        timeFilter,
        clearTimeFilterByDay,
        clearAllTimeFilters
    } = searchContext;

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

    const onClick = (e, day) => {
        e.preventDefault();
        clearTimeFilterByDay(day);
    };

    return (
        <Fragment>
            {timeFilter.filter(
                (day) => day.startTime.length !== 0 && day.endTime.length !== 0
            ).length > 0 && (
                <div>
                    <br />
                    <button
                        className='btn btn-light'
                        onClick={clearAllTimeFilters}
                    >
                        Clear time filters
                    </button>
                </div>
            )}
            <div className='grid-5'>
                {timeFilter
                    .map((dayFilter) =>
                        dayFilter.startTime.length > 0 ? dayFilter : null
                    )
                    .map((dayFilter, dfIndex) => {
                        if (dayFilter !== null) {
                            return (
                                <div key={dfIndex} className='time-card'>
                                    <IconButton
                                        size='small'
                                        edge='start'
                                        onClick={(e) =>
                                            onClick(
                                                e,
                                                convertDayFromIndex(dfIndex)
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <div className='time-card-text'>
                                        {` ${convertDayFromIndex(
                                            dfIndex
                                        )}: ${dayFilter.startTime
                                            .map((slotStartTime, slotIndex) => {
                                                return `${slotStartTime} - ${dayFilter.endTime[slotIndex]}`;
                                            })
                                            .join(', ')}`}
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
            </div>
        </Fragment>
    );
};

export default TimeFilters;
