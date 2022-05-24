import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  indexAuthedRoutes,
  indexPublicRoutes,
  placeholderOrder,
} from './utils/consts';
import Context from './context/context';
import AppRouter from './routers/AppRouter';
import Notifications from './components/Notifications';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  const { orders } = useContext(Context);
  useEffect(() => {
    orders.setActiveOrder(placeholderOrder);
  }, []);
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
