import React, { Component } from "react";
import API from "../global/API";
import ValidationMessage from "../global/ValidationMessage";
import { browserHistory } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailValid: true,
      passwordValid: true,
      formValid: false,
      errorFlag: false,
      errorList: [],
      activateErrorBox: false,
      formErrors: { email: "", password: "" },
    };
  }
  // on change of input fields hadle change
  handleUserInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    let fieldValidationErrors = this.state.formErrors;
    let passwordValid = this.state.passwordValid;
    let errorList = this.state.errorList;

    switch (fieldName) {
        /*case 'email':
          emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value.length;
          if(!emailValid) {
            if(this.state.errorList.indexOf('Please enter a valid email address.') === -1) errorList.push('Please enter a valid email address.')
          }
          else {
            if(this.state.errorList.indexOf('Please enter a valid email address.') > -1) {
              let getIndex = this.state.errorList.indexOf('Please enter a valid email address.');
              errorList.splice(getIndex, 1);
            }
          }
          break;
        case 'password':
          passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 6;
          if(!passwordValid) {
            if(this.state.errorList.indexOf('Incorrect Password. Try again.') === -1) errorList.push('Incorrect Password. Try again.')
          }
          else {
            if(this.state.errorList.indexOf('Incorrect Password. Try again.') > -1) {
              let getIndex = this.state.errorList.indexOf('Incorrect Password. Try again.');
              errorList.splice(getIndex, 1);
            }
          }
          break;
        default:
          break;*/
         case 'email':
          if(value.length) {
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : 'Incorrect email address.';
          }
          else {
            emailValid = false;
            fieldValidationErrors.email = 'Email field is mandatory.';
          }
          break;
        case 'password':
          if(value.length) {
            passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '' : 'Incorrect password.';
          }
          else {
            passwordValid = false;
            fieldValidationErrors.password = 'Password field is mandatory.';
          }
          break;
        default:
          break;

    }
    this.setState({
       // errorList,
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid
    }, this.validateForm);
    if(!this.state.errorList.length) this.setState({ activateErrorBox: false });
  }
  // Validate form is any field has an error?
  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }
  // Submit login form on click of this button
  submitLoginForm = (e) => {
    e.preventDefault();
    var self = this;
    let fieldsToValidate = [this.state.email, this.state.password];
    let fieldsKeys = ['email', 'password'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) self.postLoginData(self.state.email, self.state.password);
      else self.setState({ activateErrorBox: true });
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false });
    }, 5000);
  }
  // Post Login details
  postLoginData = (username, password) => {
    let loginData = { username, password }
    let getData = API.NOPOST('user/login/', loginData);
    getData.then(data => {
      if(data.status === 200) return data.json();
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(!this.state.errorFlag) {
        localStorage.setItem('ecrypt_data', JSON.stringify(responseData));
        if (responseData.cur_role === null || responseData.cur_role === "null") window.location.assign('/splash');
        else window.location.assign('/dashboard');
      }
      else {
        let errorList = this.state.errorList;
        if(errorList.indexOf(responseData.message) === -1) errorList.push(responseData.message);
        this.setState({ errorList, activateErrorBox: true});
        setTimeout(() => {
          this.setState({ errorFlag: false, activateErrorBox: false, errorList: [] });
        }, 5000);
      }
    });
  }

  // Validate fields on blur
  validationOnBlur = (event, val) => {
    if (val) {
      const { name, value } = event.target;
      this.setState({ [name]: value }, () => this.validateField(name, value));
    }
  }

  // On click of forgot password and terms ans service link
  referPage = val => this.props.currTab(val);
  // Once validation message pops up then close button will close the validation
  closeValidation = (val) => {
    this.setState({ activateErrorBox: val, errorList: [] });
  }
  render() {
    return (
      <div>
        <div className="signin_form">
          <form onSubmit={(e) => this.submitLoginForm(e)}>
            <div className="login_input_box form-group margBT20">
              <div className={!this.state.emailValid ? 'pos_relative has_error margBT46' : 'pos_relative'}>
                <input
                  type="email"
                  className="form-control margBt10"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={event => this.handleUserInput(event)}
                  onBlur={event => this.validationOnBlur(event, !this.state.emailValid)}
                />
                {
                  !this.state.emailValid &&
                  <span className="validation_info arrow_box">{this.state.formErrors.email}</span>
                }
              </div>
              <div className={!this.state.passwordValid ? 'pos_relative has_error margBT36' : 'pos_relative'}>
                <input
                  type="password"
                  className="form-control margBt5"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={event => this.handleUserInput(event)}
                  onBlur={event => this.validationOnBlur(event, !this.state.passwordValid)}
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
                  href="http://handshake.stage-codal.com/terms-of-use/"
                >
                  Terms of Use
                </a>{" "}
                and{" "}
                <a
                  href="http://handshake.stage-codal.com/privacy-policy/"
                >
                  Privacy Policy
                </a>
              </p>
              <button type="submit" className="custom_login_btn" onClick={(e) => this.submitLoginForm(e)}>
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
