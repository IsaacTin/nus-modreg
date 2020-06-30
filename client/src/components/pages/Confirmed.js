import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Confirmed = () => {
    useEffect(() => {
        let isRedirected = false;
        if (!isRedirected) {
            setTimeout(() => setRedirect(true), 3000);
        }
        return () => {
            isRedirected = true;
        };
        //eslint-disable-next-line
    }, []);

    const [redirect, setRedirect] = useState(false);
    const redirectToHome = () => {
        setRedirect(true);
    };

    return redirect ? (
        <Redirect to='/' />
    ) : (
        <div className='centered'>
            <h2>Your modules have been confirmed! </h2>
            <h3>You will be redirected to the home page shortly.</h3>
            Click here if the page doesn't automatically redirect:
            <br />
            <br />
            <button className='btn btn-dark' onClick={redirectToHome}>
                Back to Home
            </button>
        </div>
    );
};

export default Confirmed;
