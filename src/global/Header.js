import React, { Component } from 'react';
import $ from "jquery";
import API from "./API";
import { browserHistory, History, hashHistory} from 'react-router';
import pic_header from '../assets/images/user-ico.png';
import header_logo from '../assets/images/logo1.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data"))
  ? JSON.parse(localStorage.getItem("ecrypt_data"))
  : "";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_role: '',
      successFlag: false,
      user_avatar: ''
    }
      if (localStorage.getItem('ecrypt_data') == null) {
       browserHistory.push("/");
      }
      if (localStorage.getItem('ecrypt_data') !== null) {
        window.history.pushState(null, null, window.location.href);
         window.onpopstate = function (event) {
          this.history.go(1);
        };
      }
  }
  componentWillMount() {
    if (isUserLoggedIn) this.setState({ user_role: isUserLoggedIn.cur_role, user_avatar: isUserLoggedIn.user_avatar });
    $(document).ready(function () {
      $(".nav-item.profile_pic_li a").click(function(event) {
        $(".navbar-collapse").removeClass('show');
      });
    });
  }
  // On click of logout call this function
  logoutUser = () => {
    let getData = API.GET('user/logout/');
    getData.then(data => data)
      .then(responseData => {
        localStorage.clear();
        window.location.assign('/');
      });
    localStorage.clear();
  }
  // Change role of user
  switchUser = () => {
    let userData = JSON.parse(localStorage.getItem("ecrypt_data"));
    let newRole = userData.cur_role === 'seller' ? 'buyer' : 'seller';
    let patchData = { 'cur_role': newRole }
    let getData = API.PATCH(`user/${isUserLoggedIn.id}/`, patchData);
    getData.then(response => {
      if (response.status === 200) this.setState({ successFlag: true });
      return response.json()
    }).then(responseData => {
      if (this.state.successFlag) {
        this.setState({ user_role: responseData.cur_role });
        userData.cur_role = responseData.cur_role;
        localStorage.setItem('ecrypt_data', JSON.stringify(userData));
      }
    })
  }
  render() {
    return (
      <header>
        <div className="container-fluid height60 bg-violet ">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-dark noPadLR">
              <div className="fgrow1"><a className="navbar-brand header_title header_logo" href="/dashboard"><img className="default-img img-fluid" src={header_logo} alt=""/></a></div>
              <div className="profile_detail_responsive">
                {
                  (isUserLoggedIn === "") ?
                  <ul></ul>
                  :
                  <ul>
                    <li className="nav-item">
                      <a href="javascript:;" className="nav-link header_sublinks pos_relative">
                          <span className="bell-ico"></span>
                          <span className="notification_count_header">4</span>
                      </a>
                    </li>
                    <li className="nav-item profile_pic_li">
                      <a href="javascript:;" className="nav-link header_sublinks" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="profile_pic_header">
                        {
                          this.state.user_avatar ?
                            <img src={this.state.user_avatar} alt="" /> :
                            <img src={pic_header} alt="" className="default-img" />
                        }
                        </span>
                      </a>
                      <div className="dropdown-menu custom_header_dropdown" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item active" href="#" data-toggle="modal" data-target="#switchModal">Switch to Buyer</a>
                        <a className="dropdown-item" href="/settings">Settings</a>
                        <a className="dropdown-item" href="#" href="javascript:;" onClick={() => this.logoutUser()}>Logout</a>
                      </div>
                    </li>
                  </ul>
                }
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                {
                  (isUserLoggedIn === "") ?
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link header_sublinks" href="/contact">CONTACT</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link header_sublinks" href="/">SIGN IN</a>
                      </li>
                    </ul> :
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a className="nav-link header_sublinks" href="/dashboard">DASHBOARD</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link header_sublinks" href="/contact">CONTACT</a>
                      </li>
                      <li className="nav-item display_responsive_hidden">
                        <a href="javascript:;" className="nav-link header_sublinks pos_relative">
                          <span className="bell-ico"></span>
                          <span className="notification_count_header">4</span>
                        </a>
                      </li>
                      <li className="nav-item profile_pic_li display_responsive_hidden">
                        <a href="javascript:;" className="nav-link header_sublinks" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span className="profile_pic_header">
                            {
                              this.state.user_avatar ?
                                <img src={this.state.user_avatar} alt="" /> :
                                <img src={pic_header} alt="" className="default-img" />
                            }
                          </span>
                        </a>
                        <div className="dropdown-menu custom_header_dropdown" aria-labelledby="dropdownMenuLink">
                          <a className="dropdown-item active" href="javascript:;" data-toggle="modal" data-target="#switchModal">
                            {
                              this.state.user_role === 'seller' ? 'Switch to Buyer' : 'Switch to Selller'
                            }
                          </a>
                          <a className="dropdown-item" href="/settings">Settings</a>
                          <a className="dropdown-item" href="javascript:;" onClick={() => this.logoutUser()}>Logout</a>
                        </div>
                      </li>
                    </ul>
                }
              </div>
            </nav>
          </div>
        </div>
        <div className="modal fade" id="switchModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <h5>Are you sure?</h5>
                <p>Are you sure you want to switch accounts now?<br /> Anything you are working on will not be saved. </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default first" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-default second" data-dismiss="modal" onClick={() => this.switchUser()}>Yes, Switch Accounts</button>
              </div>
            </div>

          </div>
        </div>

      </header>
    );
  }
}

export default Header;
