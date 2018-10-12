import React, { Component } from "react";

class OnboardingTabs extends Component {
  // get tab name through child components
  currTab = val => this.props.currTab(val);
  render() {
    return (
      <div>
        {(this.props.activeTab === "login" ||
          this.props.activeTab === "signup") && (
            <ul className="nav nav-tabs" role="tablist">
              <li
                className={
                  this.props.activeTab === "login"
                    ? "nav-item active"
                    : "nav-item"
                }
                data-toggle="tab"
                onClick={() => this.currTab("login")}
              >
                <a className="nav-link">Sign In</a>
              </li>
              <li
                className={
                  this.props.activeTab === "signup"
                    ? "nav-item active"
                    : "nav-item"
                }
                data-toggle="tab"
                onClick={() => this.currTab("signup")}
              >
                <a className="nav-link">Create an Account</a>
              </li>
            </ul>
          )}
      </div>
    );
  }
}

export default OnboardingTabs;
