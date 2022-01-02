import './styles/App.css';
import Header from './core/header';
import YourBoard from './core/your-board';
import OpponentBoard from './core/opponent-board';
import SocketRef from './contexts/socket-connection/socket-ref';

function App() {
 return (
  <div className="App">
   <SocketRef>
    <Header />
    <YourBoard />
    <OpponentBoard />
   </SocketRef>
  </div>
 );
}

export default App;
