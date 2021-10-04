import { useState } from 'react';
import "../css/Form.css";

import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import Geocode from 'react-geocode';

const firestore = firebase.firestore();
const auth = firebase.auth();

function Form (props) {
    const { uid } = auth.currentUser;

    const [photo, setPhoto] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [incident, setIncident] = useState();
    const [location, setLocation] = useState();
    const [date, setDate] = useState();

    const orgRef = firestore.collection('organization');
    const orgDoc = orgRef.doc(uid);
    const memberRef = orgDoc.collection('members');
    const memberDoc = memberRef.doc(props.member);

    memberDoc.get()
    .then((doc) => {
        if (doc.exists) {
            setPhoto(doc.data().photoURL);
            setName(doc.data().displayName);
            setEmail(doc.data().email);
            console.log(doc.data());
        } else {
            console.log('no data');
        }
    }).catch((error) => {});

    Geocode.setApiKey('AIzaSyDx7izFJuO4Nnwzmi7sljqbvycIdUuRTpA');

    function saveData() {
        const reportRef = firestore.collection('reports');
        const reportDoc = reportRef.doc(uid);
        const incidentRef = reportDoc.collection(email);

        Geocode.fromAddress(location).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;

              try {
                incidentRef.add({
                    email: email,
                    displayName: name,
                    photoURL: photo,
                    incident,
                    location,
                    lat,
                    lng,
                    date,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            } catch (e) { console.log(e);}
            },
            (error) => {
              console.error(error);
            }
          );
    }

    return (
        <div className="form-container">
            <div className="input-form">
                <img src={photo} alt='profile'/>

                <p className="label">Full Name</p>
                <p className="value">{name}</p>

                <p className="label">Email</p>
                <p className="value">{email}</p>

                <p className="label">Incident</p>
                <input className="textbox" type="text" value={incident} onChange={e => setIncident(e.target.value)}></input>

                <p className="label">Location</p>
                <input className="textbox" type="text" value={location} onChange={e => setLocation(e.target.value)}></input>

                <p className="label">Date</p>
                <input className="textbox" type="date" value={date} onChange={e => setDate(e.target.value)}></input>

                <button className="submit-btn" onClick={() => {saveData(); props.render("organization")}}>
                    <i className="fas fa-clipboard-check"></i>
                </button>
            </div>
        </div>
    );
}

export default Form;