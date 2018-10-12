import React, { Component } from "react";
import OnboardingTabs from "./OnboardingTabs";
import { browserHistory } from 'react-router';
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import TermsofService from "./TermsofService";
import Resetpassword from "./Resetpassword";
import VerifyUser from "./VerifyUser";
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data"))
  ? JSON.parse(localStorage.getItem("ecrypt_data"))
  : "";

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabName: "login",
      signupData: {}
    };
  }
  componentWillMount() {
    if(this.props.params.stateName) this.setState({ tabName: this.props.params.stateName });
    if(isUserLoggedIn) {
      if (isUserLoggedIn.cur_role === null || isUserLoggedIn.cur_role === "null") browserHistory.push('/splash');
      else browserHistory.push('/dashboard');
    }
  }
  // Based on tab selected render view accordingly
  renderOnboardingView = () => {
    switch(this.state.tabName) {
      case "login":
        return <Login currTab={this.currTab} />
      case "signup":
        return <Signup currTab={this.currTab} getSignupData={this.getSignupData} postSignupData={this.state.signupData} />
      case "forgotPassword":
        return <ForgotPassword currTab={this.currTab} />
      case "termsofService":
        return <TermsofService postSignupData={this.state.signupData} currTab={this.currTab} />
      case "reset-password":
        return <Resetpassword currTab={this.currTab} token={this.props.params.token} />
      case "register-user-verification":
        return <VerifyUser currTab={this.currTab} token={this.props.params.token} />
      default:
        return <Login currTab={this.currTab} />
    }
  };
  // get tab name through child components
  currTab = val => this.setState({ tabName: val });
  // get signpdata from signup module and pass it to terms and service
  getSignupData = signupData => this.setState({ signupData})
  render() {
    return (
      <div>
        <div className="container-fluid login_bg mid-sction">
          <div className="loginBox align-self-lg-center">
            <OnboardingTabs currTab={this.currTab} activeTab={this.state.tabName} />
            <div className="tab-content">{this.renderOnboardingView()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboarding;
