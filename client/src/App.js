import './App.css';
import { BrowserRouter as Router} from "react-router-dom";

import Navbar from './components/NavBar/Navbar';
import MainPages from './components/MainPages';

function App() {
  return (

    <div className="App">
      <Router>
      <header>
        <Navbar/>
      </header>
      
         
    
        <main>
       
        <MainPages/>
              
        </main>
        <footer></footer>
     
        </Router>
      
      
    </div>

  );
}

export default App;
