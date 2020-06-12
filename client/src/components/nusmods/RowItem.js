import React from 'react';

const RowItem = ({module}) => {
    return (
        <div>
            {module.moduleName}
            <br />
            {module.moduleCode}
        </div>
    )
}

export default RowItem;