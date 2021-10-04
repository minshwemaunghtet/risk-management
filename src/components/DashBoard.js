import React, { useState } from 'react';

import Sidebar from './Sidebar';
import Map from './Map';
import Organization from './Organization';
import Form from './Form';

import firebase from '../config/firebase';
import 'firebase/auth';
const auth = firebase.auth();

function DashBoard () {
    const [route, setRoute] = useState([]);

    return auth.currentUser && (
        <div className='dashboard-container'>
            <Sidebar render={route => setRoute(route)}/>
            { route === "map" && <Map /> }
            { route === "organization" && <Organization render={route => setRoute(route)} get={route => setRoute(route)}/> }
            { route[0] === "report" && <Form member={route[1]} render={route => setRoute(route)}/> }
        </div>
    );
}

export default DashBoard;