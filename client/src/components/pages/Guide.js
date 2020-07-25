import React, { useState, useContext, useEffect } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import Director from '../guide/Director';
import LayoutContext from '../../context/layout/layoutContext';

const Guide = () => {
    const layoutContext = useContext(LayoutContext);
    const [step, setStep] = useState(1);

    const { closeSidebar } = layoutContext;

    const handleItemClick = (number) => {
        setStep(number);
    };

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='guide'>
            Steps
            <Menu attached='top' tabular widths='6'>
                <Menu.Item
                    name='1'
                    active={step === 1}
                    onClick={() => handleItemClick(1)}
                />
                <Menu.Item
                    name='2'
                    active={step === 2}
                    onClick={() => handleItemClick(2)}
                />
                <Menu.Item
                    name='3'
                    active={step === 3}
                    onClick={() => handleItemClick(3)}
                />
                <Menu.Item
                    name='4'
                    active={step === 4}
                    onClick={() => handleItemClick(4)}
                />
                <Menu.Item
                    name='5'
                    active={step === 5}
                    onClick={() => handleItemClick(5)}
                />
                <Menu.Item
                    name='6'
                    active={step === 6}
                    onClick={() => handleItemClick(6)}
                />
            </Menu>
            <Segment attached='bottom'>
                <Director number={step} />
            </Segment>
        </div>
    );
};

export default Guide;
