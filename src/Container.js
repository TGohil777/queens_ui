import React from 'react'
import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './pages/user/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import PracticeForm from './pages/Practice/PracticeForm'
import ViewPractice from './pages/Practice/SinglePractice/ViewPractice'
import jwt_decode from 'jwt-decode'
import {logoutUser} from './state/ducks/auth'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

export default function Container() {
    
    const { token } = useLocalStorage();
    
    if (localStorage.token) {
        // Set auth token header auth
      //  setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        //store.dispatch(setCurrentUser(decoded));
      
        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Logout user
        logoutUser();
          // Clear current Profile
        //  store.dispatch(clearCurrentProfile());
          // Redirect to login
          window.location.href = '/login';
        }
      }
    return (
        <Router>
            <div className="App">
                <Route exact path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard}/>
                <Route path='/practiceform' component={PracticeForm} />
                <Route path='/:name' />
                <Redirect from="*" to={token ? "/dashboard" : "/login"} /> 
            </div>
        </Router>
    )
}
