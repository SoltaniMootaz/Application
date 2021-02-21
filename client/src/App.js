/* eslint-disable jsx-a11y/anchor-is-valid */

import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './Components/Home.js'
import LogIn from './Components/LogIn.js'
import SignUp from './Components/SignUp.js'
import Article from './Components/Article.js'

function App() {
  return (
    <div className="App">
     <Router>
          {/* <header>
         
               <ul>
                   <li style={{color:'white'}}><Link to="/Home">Home</Link></li>
                   <li style={{color:'white'}}><Link to="/Log-in">Log-in</Link></li>
                   <li style={{color:'white'}}><Link to="/Sign-UP">Sign-in</Link></li>
          
               </ul>
              
              </header>  test*/}
        

       

        <Switch>
           
          <Route exact path="/">
            <Redirect to="/Log-in"></Redirect>
          </Route>
            <Route exact path="/Home"><Home></Home></Route>
            <Route exact path="/Article"><Article></Article></Route>
            <Route exact path="/Log-in"><LogIn></LogIn></Route>  
            <Route exact path="/Sign-UP"><SignUp></SignUp></Route> 
           
        </Switch>
        </Router>
    </div>
  );
}

export default App;
 