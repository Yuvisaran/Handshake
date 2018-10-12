import React, { Component } from "react";
import { browserHistory } from 'react-router';
import PersonalInfo from "./PersonalInfo.js";
import ChangePassword from "./ChangePassword.js";
import Editprofile from "./Editprofile.js";
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data")) ? JSON.parse(localStorage.getItem("ecrypt_data")) : "";

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      tabName: "personal-info"
    };
  }
  componentWillMount() {
    // if user is not logged in then redirect to signin screen else get all data of user
    if(isUserLoggedIn === "") browserHistory.push('/');
    else if(this.props.params.stateName) this.setState({ tabName: this.props.params.stateName });
  }
  renderSettingView = () => {
    switch (this.state.tabName) {
      case "personal-info":
        return <PersonalInfo />;
      case "change-password":
        return <ChangePassword />;
      case "edit-profile":
        return <Editprofile />;
      default:
        break;
    }
  };
  changeTab = val => {
    browserHistory.push(`/settings/${val}`);
    this.setState({ tabName: val });
  };
  render() {
    return (
      <div>
        <div className="container-fluid mid-sction-settings bg_gray">
          <div className="container">
            <div className="row setting-box">
              <div className="col-lg-3 col-md-3 col-sm-12 col-12 noPadLR">
                <div className="settings_menu">
                  <h4>Settings</h4>
                  <div className="settings_submenu">
                    <a
                      href="javascript:;"
                      className={this.state.tabName === 'personal-info' ? "active" : undefined}
                      onClick={() => this.changeTab("personal-info")}
                    >
                      Personal Information
                    </a>
                    <a
                      href="javascript:;"
                      className={this.state.tabName === 'change-password' ? "active" : undefined}
                      onClick={() => this.changeTab("change-password")}
                    >
                      Change Password
                    </a>
                    <a
                      href="javascript:;"
                      className={this.state.tabName === 'edit-profile' ? "active edit_profile_custom_responsive pl-0" : "pl-0"}
                      onClick={() => this.changeTab("edit-profile")}
                    >
                      <span className="margL20">Edit Profile</span>
                    </a>
                    {/*
                      this.state.tabName === 'edit-profile' &&
                      <div className="profile_photo_setting">
                        Profile Photo
                      </div>
                    */}
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-12 col-12 noPadLR">
                <div className="settings_info">{this.renderSettingView()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
