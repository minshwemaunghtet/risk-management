import React, { useState } from 'react';
import "../css/Login.css";

import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

function Login () {

    const [flag, setFlag] = useState(false);

    const login = async(provider) => {
    await auth.signInWithPopup(provider)
      .then(async() => {
        const { uid, displayName, email, photoURL } = await auth.currentUser;
        const profileRef = firestore.collection('profile').doc(uid);
        const user = await profileRef.get();

        if(!user.exists) {
          await profileRef.set({
            uid,
            displayName,
            email,
            photoURL,
            username: null
          });
        }
        }).catch(err => {
            if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
            setFlag(false);
            } else {
            setFlag(true);
            }
        });
    }

    return(
        <div className="login-container">
            <div className="login-form">
                <p>Welcome to <span>Riskly</span></p>
                <button className="login-btn" onClick={() => login(googleProvider)}><i className="fab fa-google"></i>Login with Google</button>
                <button className="login-btn" onClick={() => login(githubProvider)}><i className="fab fa-github"></i>Login with Github</button>
                {flag && <p>email already exists with another account</p>}
            </div>
        </div>
    );
}

export default Login;