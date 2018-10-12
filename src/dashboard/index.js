import React, { Component } from "react";
import { browserHistory } from 'react-router';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data")) ? JSON.parse(localStorage.getItem("ecrypt_data")) : "";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: ''
    }
  }
  componentWillMount() {
    if(isUserLoggedIn) this.setState({ userRole: isUserLoggedIn.cur_role });
    else browserHistory.push('/');
  }
  // Based on user role display dashboard
  renderDashboard = () => {
    switch(this.state.userRole) {
      case 'buyer':
        return <BuyerDashboard />
      case 'seller':
        return <SellerDashboard />
      default:
        break;
    }
  }
  render() {
    return(
      <div className="container">
        <div className="dashboard_container">
          { this.renderDashboard() }
        </div>
      </div>
    )
  }
}

export default Dashboard;