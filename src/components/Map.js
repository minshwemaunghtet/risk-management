import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import '../css/Map.css';

import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();
const auth = firebase.auth();

function Map () {
    const { uid, email } = auth.currentUser;

    const [viewport, setViewport] = useState({
        latitude: 29.7589382,
        longitude: -95.3676974,
        width: window.innerWidth,
        height: window.innerHeight,
        zoom: 10
    });

    const [reports, setReports] = useState();
    const [show, setShow] = useState(false);

    const reportRef = firestore.collection('reports');
    const reportDoc = reportRef.doc(uid);
    const dataRef = reportDoc.collection(email);
    const reportQuery = dataRef.orderBy('createdAt');
    
    const [reportList] = useCollectionData(reportQuery, { idField: 'id' });

    return (
        <div className="map-container">
            <ReactMapGL 
                {...viewport} 
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/gabrielzurc10/ckuag6p2216qt17o5ts54ds7b"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}  
            >
            {reportList && reportList.map(report => 
                <Marker key={report.id} latitude={report.lat} longitude={report.lng}>
                        <button onClick={e => {e.preventDefault();setShow(!show);setReports(report);}} className="marker">
                        </button>
                </Marker>
                
            )}  
            
            {show && 
                <Popup latitude={reports.lat} longitude={reports.lng}>
                    <div className="popup-container">
                        <img className="popup-img" src={reports.photoURL} alt="profile"/>
                        <p className="popup-txt">{reports.displayName}</p>
                        <p className="popup-inc">{reports.incident}</p>
                        <p className="popup-txt">{reports.date}</p>
                    </div>
                </Popup>
            }
            
            </ReactMapGL>
        </div>
    );
}

export default Map;