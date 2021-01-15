import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import './css/App.css';
import Login from './components/LoginPage/Login';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Switch, Route */}
        <Route path="/" exact={true} component={Home} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
