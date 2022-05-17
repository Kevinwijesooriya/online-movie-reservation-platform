import './App.css';
import { BrowserRouter as Router} from "react-router-dom";

import Navbar from './components/NavBar/Navbar';
import MainPages from './components/MainPages';
import Footer from './components/Footer/Footer';
import { DataProvider } from './GlobalState';

function App() {
  return (

    <div className="App">
        <DataProvider>
      <Router>
      <header>
        <Navbar/>
      </header>
      
         
    
        <main>
       
        <MainPages/>
              
        </main>
        <footer>
          <Footer/>
        </footer>
     
        </Router>
        </DataProvider>
      
    </div>

  );
}

export default App;
