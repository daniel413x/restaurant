import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  indexAuthedRoutes,
  indexPublicRoutes,
} from './utils/consts';
import AppRouter from './routers/AppRouter';
import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Notifications />
      <Navigation />
      <div id="main-routes-content">
        <AppRouter
          publicRoutes={indexPublicRoutes}
          authedRoutes={indexAuthedRoutes}
        />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
