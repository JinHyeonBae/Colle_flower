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

function App({ client }) {
  return (
    <div className="App_Frame">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Chat/colleflower/:ServerCode" component={Channel}/>
          {/* <Route path="/colleflower/pknu:ServerCode" component={Message}/> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
