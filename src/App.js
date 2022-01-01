import './styles/App.css';
import Header from './core/header';
import YourBoard from './core/your-board';
import OpponentBoard from './core/opponent-board';

function App() {
 return (
  <div className="App">
   <Header />
   <YourBoard />
   <OpponentBoard/>
  </div>
 );
}

export default App;
