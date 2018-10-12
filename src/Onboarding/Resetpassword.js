import React, { Component } from "react";
import API from "../global/API";
import ValidationMessage from "../global/ValidationMessage";

class Resetpassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      password: '',
      confirm_password: '',
      formValid: false,
      errorflag: false,
      successflag: false,
      passwordValid: true,
      confirm_passwordValid: true,
      errorList: [],
      activateErrorBox: false,
    }
  }
  componentWillMount() {
    if (!this.props.token) this.props.currTab('login');
    else {
      fetch(`${API.basePath}user/reset_token_expried/?token=${this.props.token}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(responseval1 => {
        return responseval1.json();
      })
      .then(responseData => {
        if (responseData.is_expired) {
          let errorList = this.state.errorList;
          errorList.push('Token has been expired.');
          this.setState({ activateErrorBox: true, errorList });
          setTimeout(() => {
            this.setState({ activateErrorBox: false, errorList: [] });
            window.location.assign('/');
          }, 3000);
        }
      })
      this.setState({ token: this.props.token });
    }
  }
  // on change of input fields hadle change
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let errorList = this.state.errorList;
    let passwordValid = this.state.passwordValid;
    let confirm_passwordValid = this.state.confirm_passwordValid;

    switch (fieldName) {
      case 'password':
        passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 8;
        if(!passwordValid) {
          if(this.state.errorList.indexOf('Passwords must be at least 8 characters with at least one uppercase letter and one special character.') === -1) errorList.push('Passwords must be at least 8 characters with at least one uppercase letter and one special character.');
        }
        else {
          if(this.state.errorList.indexOf('Passwords must be at least 8 characters with at least one uppercase letter and one special character.') > -1) {
            let getIndex = this.state.errorList.indexOf('Passwords must be at least 8 characters with at least one uppercase letter and one special character.');
            errorList.splice(getIndex, 1)
          }
        }
        break;
      case 'confirm_password':
        confirm_passwordValid = (value === this.state.password) && value.length;
        if(!confirm_passwordValid) {
          if(this.state.errorList.indexOf('Confirm password should match with password.') === -1) errorList.push('Confirm password should match with password.');
        }
        else {
          if(this.state.errorList.indexOf('Confirm password should match with password.') > -1) {
            let getIndex = this.state.errorList.indexOf('Confirm password should match with password.');
            errorList.splice(getIndex, 1)
          }
        }
        break;
      default:
        break;
    }
    this.setState({
      errorList,
      passwordValid,
      confirm_passwordValid
    }, this.validateForm);
  }
  // Validate form is any field ha an error?
  validateForm() {
    this.setState({ formValid: this.state.passwordValid && this.state.confirm_passwordValid });
  }
  // Submit reset password form on click of this button
  submitResetForm = () => {
    var self = this;
    let fieldsToValidate = [this.state.password, this.state.confirm_password];
    let fieldsKeys = ['password', 'confirm_password'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) self.postResetData(self.state.token, self.state.password, self.state.confirm_password);
      else self.setState({ activateErrorBox: true });
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false })
    }, 5000)
  }
  // Post reset password form data
  postResetData = (token, password, confirm_password) => {
    let resetFormData = { token, password, confirm_password }
    let getData = API.NOPUT('user/reset_password/', resetFormData);
    getData.then(data => {
      if(data.status === 204 || data.status === 200) {
        this.setState({ successFlag: true });
        setTimeout(() => {
          this.setState({ successFlag: false });
          this.referPage('login');
        }, 3000);
      }
      else {
        this.setState({ errorFlag: true });
        setTimeout(() => {
          this.setState({ errorFlag: false });
        }, 3000);
        return data.json();
      }
    }).then(responseData => {
      if (this.state.errorFlag) {
        let errorList = this.state.errorList;
        if(errorList.indexOf(responseData.message) === -1) errorList.push(responseData.message);
        this.setState({ errorList, activateErrorBox: true});
        setTimeout(() => {
          this.setState({ errorFlag: false, activateErrorBox: false, errorList: [] });
        }, 5000);
      }
    });
  }
  referPage = val => this.props.currTab(val);
  // Validate fields on blur
  validationOnBlur = (event, val) => {
    if (val) {
      const { name, value } = event.target;
      this.setState({ [name]: value }, () => this.validateField(name, value));
    }
  }
  // Once validation message pops up then close button will close the validation
  closeValidation = (val) => {
    this.setState({ activateErrorBox: val, errorList: [] });
  }
  render() {
    return (
      <div className="reset_password_box">
        <div className="forgetpass_header">
          <h2>Reset Password</h2>
        </div>
        {
          this.state.successFlag &&
          <div className="successContainer">Password changed successfully, please login.</div>
        }
        <div className="forgotpass_input_box">
          <form>
            <p className="forgetpass_text">
              Enter a new password for your account
            </p>
            <div className={!this.state.passwordValid ? "pos_relative has_error" : 'pos_relative'}>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                name="password"
                value={this.state.password}
                onChange={event => this.handleUserInput(event)}
                onBlur={event => this.validationOnBlur(event, !this.state.passwordValid)}
              />
            </div>
            <div className={!this.state.confirm_passwordValid ? "pos_relative has_error" : "pos_relative"}>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={event => this.handleUserInput(event)}
                onBlur={event => this.validationOnBlur(event, !this.state.confirm_passwordValid)}
              />
            </div>
            <div className="signin_btn">
              <button type="button" className="custom_login_btn" onClick={() => this.submitResetForm()}>Reset Password</button>
            </div>
          </form>
        </div>
        {
          this.state.activateErrorBox &&
          <ValidationMessage closeValidation={this.closeValidation} errorList={this.state.errorList} />
        }
      </div>
    );
  }
}

export default Resetpassword;
