import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './Components/Pages/Home.js'
import LogIn from './Components/Authentification/LogIn'
import SignUp from './Components/Authentification/SignUp'
import menu from './Components/Pages/menu'
import Caisse from './Components/Pages/Caisse'
import PrivateRoute from './Routing/PrivateRoute'
import Cuisine from './Components/_CaisseComponents/tickets/cuisine'
import journal from './Components/Pages/journal';
import Kredi from './Components/Pages/Kredi';
import Options from './Components/Pages/options';
import Stock from './Components/Pages/Stock';
import Statistiques from './Components/Pages/Statistiques';
import TestingPage from './Components/Pages/TestingPage';

function App() {
  return (
    <div className="App">
      <Router>   
        <Switch>
          <Route exact path="/">S
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
          <PrivateRoute exact path="/statistiques" component={Statistiques}></PrivateRoute>
          <PrivateRoute exact path="/test" component={TestingPage}></PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
 