import logo from './logo.svg';
import './App.css';
import Channel from "./components/Channel/Channel.js"

function App({client}) {
  return (
    <div className="App_Frame">
      <div>
          <Channel />
      </div>
    </div>
  );
}

export default App;
