import React, { Component } from "react";
import API from "../global/API";
import loader from '../assets/images/loader.gif';

class VerifyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorFlag: false,
      errorMessage: '',
      successFlag: false
    }
  }
  componentWillMount() {
    let verificationData = {
      email_token: this.props.token
    }
    let getData = API.NOPUT('user/email_verification/', verificationData);
    getData.then(data => {
      if(data.status === 200) {
        this.setState({ successFlag: true });
        return data.json();
      }
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(!this.state.errorFlag) {
        setTimeout(() => {
          this.setState({ successFlag: false });
          this.props.currTab('login');
        }, 3000);
      }
      else {
        this.setState({ errorMessage: responseData.message});
        setTimeout(() => {
          this.setState({ errorFlag: false });
          this.props.currTab('login');
        }, 3000);
      }
    });
  }
  render() {
    return (
      <div className="forget_pass_box">
        <div className="forgetpass_header">
          <h2>User Verification</h2>
        </div>
        {
          this.state.errorFlag &&
          <div className="errorContainer">{this.state.errorMessage}</div>
        }
        {
          this.state.successFlag &&
          <div className="successContainer">Congrats! your account is active now.</div>
        }
        <div className="forgotpass_input_box">
          <div className="text-center mb-30">
            <img src={loader} alt="loader" />
          </div>
          <p className="text-center">Please wait while we are verifying your account. <br /> You will be auto redirected to login page once verification completed.</p>
        </div>
      </div>
    );
  }
}

export default VerifyUser;
