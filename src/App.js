import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import ReservasPage from './components/ReservasPage';
import Policies from './components/policies';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import LoginAdmin from './components/LoginAdmin';
import AdminPage from './components/AdminPage';
import VerReservas from './components/verReservas';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/reservar" exact component={ReservasPage} />
          <Route path="/policies" exact component={Policies} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/gallery" exact component={Gallery} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/LoginAdmin" exact component={LoginAdmin} />
          <Route path="/AdminPage" exact component={AdminPage} />
          <Route path="/verReservas" exact component={VerReservas} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;