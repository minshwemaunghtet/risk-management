import '../css/Option.css';

import firebase from '../config/firebase';
import 'firebase/auth';
const auth = firebase.auth();

function Option () {
    return auth.currentUser && (
        <div className="option-container">
            <button className='signout-btn' onClick={() => auth.signOut()}><i className="fas fa-sign-out-alt"></i></button>
        </div>  
    );
}

export default Option;