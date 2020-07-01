import React, { useContext, useState } from 'react';
import SearchContext from '../../context/search/searchContext';

const EmptySlot = ({ startTime, endTime, day }) => {
    const searchContext = useContext(SearchContext);

    const { addTimeFilter, deleteTimeFilter } = searchContext;

    const [selected, setSelected] = useState(false);
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
