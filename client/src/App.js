import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './css/App.css';
import SignIn from './components/SignInPage/SignIn';
import SignUp from './components/SignUpPage/SignUp';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
