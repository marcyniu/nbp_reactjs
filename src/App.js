// css:
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// js:
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import ConversionTable from './components/ConversionTable'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tables">Conversion Table</Link>
              </li>
            </ul>
          </nav>


          <Switch>
            <Route path="/tables">
              <ConversionTable/>
            </Route>

            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
        
      </Router>
    </div>
  );
}

export default App;
