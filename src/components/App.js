import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import '../css/App.css';

import DashBoard from './DashBoard';
import Option from './Option';
import Form from './Form';

import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/auth';

const auth = firebase.auth();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <div className="header">
        <p className="logo">Riskly</p>
        <Option />
      </div>
      <section>
        <BrowserRouter>
          <Switch>
            {
            user ? 
            <>
              <Route path="/"> 
                <DashBoard /> 
              </Route> 
              <Route path="/add">
                <Form />
              </Route>
            </>
            : 
              <Route path="/"> 
                <Login /> 
              </Route>
            }
          </Switch>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;
