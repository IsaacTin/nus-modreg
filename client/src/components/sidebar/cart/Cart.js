import React, { useContext } from 'react';
import CartItem from './CartItem';
import ModuleContext from '../../context/module/moduleContext';

const Cart = () => {
    const moduleContext = useContext(ModuleContext)

    const { currentModules ,getModules, addModule } = moduleContext;

    useEffect(() => {
        getModules;     
    }, [])


    return ( 
        <div>
            This is cart
            <CartItem />
        </div>
     );
}
 
export default Cart;