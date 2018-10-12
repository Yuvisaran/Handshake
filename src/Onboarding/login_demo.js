import React, { Component } from "react";
import API from "../global/API";
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: true,
      passwordValid: true,
      formValid: false,
      errorFlag: false
    };
    this.addedFormFieldsVal = [this.state.email, this.state.password];
    this.addedFormFieldsKey = ['email', 'password'];
  }
  // on change of input fields hadle change
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value.length >= 4;
        fieldValidationErrors.email = emailValid ? '' : 'Incorrect email address.';
        break;
      case 'password':
        passwordValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/i) && value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : 'Incorrect password.';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid
    }, this.validateForm);
  }
  // Validate form is any field ha an error?
  validateForm = ()  => {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }
  // Submit login form on click of this button
  submitLoginForm = () => {
    for(let item in this.addedFormFieldsVal) {
      setTimeout(() => {
        this.validateField(this.addedFormFieldsKey[item], this.addedFormFieldsVal[item]);
      },100)
    }
    if(this.state.formValid) this.postLoginData(this.state.email, this.state.password);
  }
  // Post Login details
  postLoginData = (username, password) => {
    // let loginData = { username, password }
    // let getData = API.NOPOST('user/login/', loginData);
    // getData.then(data => {
    //   if('message' in data) {
    //     this.setState({ errorFlag: true, errorMessage: data.message });
    //     setTimeout(() => {
    //       this.setState({ errorFlag: false });
    //     }, 5000);
    //   }
    //   else {
    //     localStorage.setItem('ecrypt_data', JSON.stringify(data));
    //     if (data.cur_role === null || data.cur_role === "null") browserHistory.push('/splash');
    //     else browserHistory.push('/dashboard');
    //   }
    // });
  }

  // On click of forgot password and terms ans service link
  referPage = val => this.props.currTab(val);
  render() {
    return (
      <div>
        <div className="signin_form">
          <form>
            <div className="login_input_box form-group margBT20">
              <div className="pos_relative">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={event => this.handleUserInput(event)}
                />
                {
                  !this.state.emailValid &&
                  <span className="validation_info arrow_box">{this.state.formErrors.email}</span>
                }
              </div>
              <div className="pos_relative">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={event => this.handleUserInput(event)}
                />
                {
                  !this.state.passwordValid &&
                  <span className="validation_info arrow_box">{this.state.formErrors.password}</span>
                }
              </div>
              <label className="margBT0">
                <a
                  href="javascript:;"
                  onClick={() => this.referPage("forgotPassword")}
                >
                  Forgot your Password?
                </a>
              </label>
            </div>
            <div className="signin_btn">
              <p className="margBT0">
                By clicking Sign In, you agree to the{" "}
                <a
                  href="javascript:;"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="javascript:;"
                >
                  Privacy Policy
                </a>
              </p>
              <button type="button" className="custom_login_btn" onClick={() => this.submitLoginForm()}>
                Sign In
              </button>
              {
                this.state.errorFlag &&
                <div className="errorContainer">{ this.state.errorMessage }</div>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
