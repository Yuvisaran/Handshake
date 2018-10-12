import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory } from 'react-router';
import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-grid.min.css';
import './assets/css/bootstrap-reboot.min.css';
import './assets/css/main.scss';
import Header from "./global/Header.js";
import Footer from "./global/Footer.js";
import Settings from './settings/index';
import Onboarding from './Onboarding/index';
import Splash from './splash/index';
import Dashboard from './dashboard/index';
import PropertyDetail from './dashboard/PropertyDetail';
import Addproperty from './addproperty/index';
import Editproperty from './Editproperty/index';
import Sellerviewproperty from './Editproperty/sellerviewproperty';

import Contact from './contact/index';
import Buyproperty from './buyproperty/index';
import Buyhcode from "./buyproperty/BuyPropertyHcode";
// import BuyerDashboardOfferSummary from './buyproperty/BuyerDashboardOfferSummary'


ReactDOM.render(
  <section>
    <Header />
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={Onboarding} />
      <Route path="/onboarding(/:stateName)(/:token)" component={Onboarding} routeHistory={this.props} />
      <Route path="/splash" component={Splash} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/property-detail" component={PropertyDetail} />
      <Route path="/settings(/:stateName)" component={Settings} />
      <Route path="/addproperty" component={Addproperty} />
      <Route path="/contact" component={Contact} />
      <Route path="/buyproperty" component={Buyproperty} />
      <Route path="/buyerhcode" component={Buyhcode} />
      {/* <Route path="/buyerdashboardoffersummary" component={BuyerDashboardOfferSummary}/> */}
      <Route path="/editproperty" component={Editproperty} />
      <Route path="/sellerviewproperty" component={Sellerviewproperty} />

    </Router>
    <Footer />
  </section>
  , document.getElementById('root'));
