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
import Cuisine from './Components/CaisseComponents/tickets/cuisine'
import journal from './Components/journal';
import Kredi from './Components/Kredi';
import Options from './Components/options';
import Stock from './Components/Stock';

function App() {
  return (
    <div className="App">
      <Router>   
        <Switch>
          <Route exact path="/">
            <Redirect to="/Log-in"></Redirect>
          </Route>

          <Route exact path="/cuisine" component={Cuisine}></Route>
          <Route exact path="/Log-in" component={LogIn}></Route>  
          <Route exact path="/Sign-UP" component={SignUp}></Route> 

          <PrivateRoute exact path="/Home" component={Home}></PrivateRoute>
          <PrivateRoute exact path="/menu" component={menu}></PrivateRoute> 
          <PrivateRoute exact path="/Caisse" component={Caisse}></PrivateRoute>
          <PrivateRoute exact path="/Journal" component={journal}></PrivateRoute>
          <PrivateRoute exact path="/Kridi" component={Kredi}></PrivateRoute>
          <PrivateRoute exact path="/options" component={Options}></PrivateRoute>
          <PrivateRoute exact path="/stock" component={Stock}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
 