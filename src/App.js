// App.js
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
import publishPrty from './components/publishPrty';
import publishGalery from './components/publishGalery';
import seguridadPage from './components/seguridadPage';
import publishAbout from './components/publishAbout';
import { PrivateRoute } from './components/PrivaterRoute';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/reservar" exact component={ReservasPage} />
          <Route path="/policies" exact component={Policies} />
          <Route path="/about" exact component={About} />
          <Route path="/login/:idFiesta" component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/gallery" exact component={Gallery} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/LoginAdmin" exact component={LoginAdmin} />
          <PrivateRoute path="/AdminPage" exact component={AdminPage} />
          <PrivateRoute path="/verReservas" exact component={VerReservas} />
          <PrivateRoute path="/publishPrty" exact component={publishPrty} />
          <PrivateRoute path="/publishGalery" exact component={publishGalery} />
          <PrivateRoute path="/seguridadPage" exact component={seguridadPage} />
          <PrivateRoute path="/publishAbout" exact component={publishAbout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

