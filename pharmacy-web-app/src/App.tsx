import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import AllCategories from './pages/AllCategories';
import PrescriptionMedicines from './pages/PrescriptionMedicines';
import HealthDevices from './pages/HealthDevices';
import PersonalCare from './pages/PersonalCare';
import BabyCare from './pages/BabyCare';
import Offers from './pages/Offers';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={AllCategories} />
        <Route path="/prescription-medicines" component={PrescriptionMedicines} />
        <Route path="/health-devices" component={HealthDevices} />
        <Route path="/personal-care" component={PersonalCare} />
        <Route path="/baby-care" component={BabyCare} />
        <Route path="/offers" component={Offers} />
      </Switch>
    </Router>
  );
};

export default App;