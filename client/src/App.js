import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Channel from './components/Channel/Channel';
import Message from './components/Channel/Message/Message'
import SignIn from './components/SignInPage/SignIn';
import SignUp from './components/SignUpPage/SignUp.js'
import Login from './components/Home/Login'

function App({ client }) {
  console.log("c :",client);
  return (
    <div className="App_Frame">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Chat/colleflower/:ServerCode" component={Channel}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/Login" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
