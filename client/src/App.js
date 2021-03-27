/* eslint-disable jsx-a11y/anchor-is-valid */

import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './Components/Home.js'
import LogIn from './Components/LogIn.js'
import SignUp from './Components/SignUp.js'
import menu from './Components/menu.js'
import Caisse from './Components/Caisse.js'
import PrivateRoute from './PrivateRoute'
import Test from './test'
import Cuisine from './Components/CaisseComponents/tickets/cuisine'

function App() {
  return (
    <div className="App">
     <Router>   

        <Switch>
          <Route exact path="/">
            <Redirect to="/Log-in"></Redirect>
          </Route>
            <Route exact path="/test" component={Test}></Route> 
            <Route exact path="/cuisine" component={Cuisine}></Route>
            <Route exact path="/Log-in" component={LogIn}></Route>  
            <Route exact path="/Sign-UP" component={SignUp}></Route> 

            <PrivateRoute exact path="/Home" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/menu" component={menu}></PrivateRoute> 
            <PrivateRoute exact path="/Caisse" component={Caisse}></PrivateRoute>

        </Switch>
        </Router>
    </div>
  );
}

export default App;
 