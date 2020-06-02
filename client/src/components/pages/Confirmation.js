import React, {useContext} from 'react';
import ModuleContext from '../../context/module/moduleContext'

const Confirmation = () => {
    const moduleContext = useContext(ModuleContext)

    const { confirmModules } = moduleContext
    return ( 
        <div>
            This is confirmation page
        </div>
     );
}
 
export default Confirmation;