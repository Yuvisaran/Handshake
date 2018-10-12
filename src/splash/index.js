import React, { Component } from "react";
import { browserHistory } from 'react-router';
import sellerBg from '../assets/images/seller.png';
import buyerBg from '../assets/images/buyer.png';
import API from "../global/API";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_role: '',
      errorFlag: false,
      successFlag: false
    };
  }
  componentWillMount() {
    this.checkUserLogInStatus();
  }
  // Get value from the local storage to check whether user is logged in if logged in then check whether user have role assigned.
  checkUserLogInStatus = () => {
    setTimeout(() => {
      const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data")) ? JSON.parse(localStorage.getItem("ecrypt_data")) : "";
      if(isUserLoggedIn === "") browserHistory.push('/');
      else {
        if(isUserLoggedIn.cur_role === 'seller' || isUserLoggedIn.cur_role === 'buyer') browserHistory.push('/dashboard')
      }
    }, 200);
  }
  selectedRole = cur_role => {
    const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data")) ? JSON.parse(localStorage.getItem("ecrypt_data")) : "";
    this.setState({ cur_role });
    let patchData = { cur_role }
    let getData = API.PATCH(`user/${isUserLoggedIn.id}/`, patchData);
    getData.then(data => {
      if('message' in data) {
        this.setState({ errorFlag: true, errorMessage: data.message });
        setTimeout(() => {
          this.setState({ errorFlag: false });
        }, 5000);
      }
      else {
        this.setState({ successFlag: true });
        setTimeout(() => {
          this.setState({ successFlag: false });
        }, 5000);
        let localStorageDataUpdate = isUserLoggedIn;
        localStorageDataUpdate.cur_role = cur_role;
        localStorage.setItem('ecrypt_data', JSON.stringify(localStorageDataUpdate));
      }
    });
  }
  render() {
    return (
      <div>
        <div className="container-fluid splash_bg mid-sction">
          <div className="spalsh_container">
            <div className="splash_header">Welcome to Handshake</div>
            <div className="splash_sub_text">Choose One.</div>
            <div className="splash_box">
              <div className="splash_box_img">
                <div className="seller_box">
                  <a href="javascript:;" onClick={() => this.selectedRole('seller')} className={this.state.cur_role === 'buyer' ? "opacity-half" : undefined}>
                    <img src={sellerBg} alt="seller" />
                  </a>
                  {
                    this.state.cur_role === 'seller' &&
                    <div className="pd5-LR">
                      <div className="success-text">Great! lets get started.</div>
                      <a href="javascript:;" className="custom_login_btn">Add Property</a>
                    </div>
                  }
                </div>
                <div className="buyer_box">
                  <a href="javascript:;" onClick={() => this.selectedRole('buyer')} onClick={() => this.selectedRole('buyer')} className={this.state.cur_role === 'seller' ? "opacity-half" : undefined}>
                    <img src={buyerBg} alt="buyer" />
                  </a>
                  {
                    this.state.cur_role === 'buyer' &&
                    <div className="pd5-LR">
                      <div className="success-text">Great! lets get started.</div>
                      <a href="javascript:;" className="custom_login_btn">Find a Property</a>
                    </div>
                  }
                </div>
              </div>
              {
                this.state.cur_role === '' &&
                <div className="splash_footer">Don’t worry, you can do both!<br /><span className="blue-text">You can always switch later</span></div>
              }
            </div>
              {
                this.state.errorFlag &&
                <div className="errorContainer">{ this.state.errorMessage }</div>
              }
              {
                this.state.successFlag &&
                <div className="successContainer">User Role changed successfully!!</div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Splash;
