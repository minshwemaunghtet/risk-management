import React, { useState } from 'react';
import '../css/Organization.css'

import Member from './Member';

import firebase from '../config/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firestore = firebase.firestore();
const auth = firebase.auth();


function Organization (props) {
    const { uid } = auth.currentUser;

    const [userEmail, setEmail] = useState();
    const [name, setName] = useState();
    const [photo, setPhoto] = useState();

    try {
        const orgRef = firestore.collection('organization');
        const orgDoc = orgRef.doc(uid);
        const memberRef = orgDoc.collection('members');
        var memberDoc = memberRef.doc(userEmail);
        var memberQuery = memberRef.orderBy('createdAt');      
    } catch (e) {}
    
    const [memberList] = useCollectionData(memberQuery, { idField: 'id' });
    const profileRef = firestore.collection('profile');

    const addUser = async() => {
        profileRef.where('email', '==', userEmail).get()
        .then(profile => {
                profile.forEach(doc => {
                    setName(doc.data().displayName);
                    setPhoto(doc.data().photoURL); 
                });
        });

        try {
            memberDoc.set({
                email: userEmail,
                displayName: name,
                photoURL: photo,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (e) {}
    }

    return (
        <div className='organization-container'>
        <input className='add-member' type='text' placeholder="Search Email" value={userEmail} onChange={e => setEmail(e.target.value)} />
        <div className='member-list'>
            { memberList && memberList.map(user => <Member key={user.id} user={user} render={props.render} get={props.get}/>) }
        </div>
            <button onClick={() => addUser()} className='add-btn'>
                <i className="fas fa-plus"></i>
            </button>
        </div>
    );
}

export default Organization;