import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import "./Login.css";
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';


function Login() {

    // pulling & push user info to datalayer
    const [{}, dispatch]= useStateValue();

    const signIn = () => {
       auth.signInWithPopup(provider).then(result => {
           dispatch({
               type: actionTypes.SET_USER,
               user: result.user,
           });
       }).catch(error => alert(error.message));
    };
    return (
        <div className="login">
        {/* the below div for styling only */}
            <div className="login__container">
                <img 
                    src="https://www.hr180.co.uk/wp-content/uploads/2017/07/WhatsApp-Logo-1.png"
                    alt="logo"
                />
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login;
