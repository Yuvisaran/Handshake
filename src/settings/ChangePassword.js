import React, { Component } from "react";
import ValidationMessage from "../global/ValidationMessage";
import API from "../global/API";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      passwordValid: true,
      newPasswordValid: true,
      confirmNewPasswordValid: true,
      formValid: false,
      errorflag: false,
      successFlag: false,
      errorList: [],
      activateErrorBox: false,
    }
  }
  // on change of input fields hadle change
  handleUserInput(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let { errorList, passwordValid, newPasswordValid, confirmNewPasswordValid } = this.state
    switch (fieldName) {
      case 'password':
        passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 8;
        if(!passwordValid) {
          if(this.state.errorList.indexOf('Password must be at least 8 characters with at least one uppercase letter and one special character.') === -1) {
            errorList.push('Password must be at least 8 characters with at least one uppercase letter and one special character.');
          }
        }
        else {
          if(this.state.errorList.indexOf('Password must be at least 8 characters with at least one uppercase letter and one special character.') > -1) {
            let getIndex = this.state.errorList.indexOf('Password must be at least 8 characters with at least one uppercase letter and one special character.');
            errorList.splice(getIndex, 1)
          }
        }
        break;
      case 'newPassword':
        newPasswordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 8;
        if(!newPasswordValid) {
          if(this.state.errorList.indexOf('New Password must be at least 8 characters with at least one uppercase letter and one special character.') === -1) errorList.push('New Password must be at least 8 characters with at least one uppercase letter and one special character.');
        }
        else {
          if(this.state.errorList.indexOf('New Password must be at least 8 characters with at least one uppercase letter and one special character.') > -1) {
            let getIndex = this.state.errorList.indexOf('New Password must be at least 8 characters with at least one uppercase letter and one special character.');
            errorList.splice(getIndex, 1)
          }
        }
        break;
      case 'confirmNewPassword':
        confirmNewPasswordValid = (value === this.state.newPassword) && value.length;
        if(!confirmNewPasswordValid) {
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
      newPasswordValid,
      confirmNewPasswordValid,
    }, this.validateForm);
  }
  // Validate form is any field ha an error?
  validateForm() {
    this.setState({ formValid: this.state.passwordValid && this.state.newPasswordValid && this.state.confirmNewPasswordValid });
  }
  // post change password data
  postChangePassword = (e) => {
    e.preventDefault();
    var self = this;
    let fieldsToValidate = [this.state.password, this.state.newPassword, this.state.confirmNewPassword];
    let fieldsKeys = ['password', 'newPassword', 'confirmNewPassword'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) {
        self.postData(self.state.password,self.state.newPassword, self.state.confirmNewPassword);
      }
      else {
        self.setState({ activateErrorBox: true });
      }
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false, errorList: [] });
    }, 5000)
  }
  // post the data to django
  postData = (password, newPassword, confirmNewPassword) => {
    let changePasswordData = { password, newPassword, confirmNewPassword };
    let getData = API.POST('user/change_password/', changePasswordData);
    getData.then(data => {
      if(data.status === 200) {
        this.setState({ successFlag: true, password: '', newPassword: '', confirmNewPassword: '' });
        return data.json();
      }
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(!this.state.errorFlag) {
        this.setState({ successMessage: 'Password changed successfully!' });
        setTimeout(() => {
          this.setState({ successFlag: false });
        }, 5000);
      }
      else {
        let errorList = this.state.errorList;
        errorList.push(responseData.message);
        this.setState({ activateErrorBox: true, errorList})
        setTimeout(() => {
          this.setState({ activateErrorBox: false, errorList: [] });
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
  // Once validation message pops up then close button will close the validation
  closeValidation = (val) => {
    this.setState({ activateErrorBox: val, errorList: [] });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="personal_info_head mb-35">
            <h4>Change Password</h4>
          </div>
          <form className="personal_info_edit" action="post" onSubmit={e => this.postChangePassword(e)}>
            <div className="form-group">
              <label className="personal_info_label mb-0">
                Current Password
              </label>
              <div className={!this.state.passwordValid ? "pos_relative has_error" : "pos_relative"}>
                <input
                  type="password"
                  className="form-control pi_input"
                  value={this.state.password}
                  name="password"
                  onChange={e => this.handleUserInput(e)}
                  onBlur={event => this.validationOnBlur(event, !this.state.passwordValid)} />
              </div>
            </div>
            <div className="form-group">
              <label className="personal_info_label mb-0">New Password</label>
              <div className={!this.state.newPasswordValid ? "pos_relative has_error" : "pos_relative"}>
                <input
                  type="password"
                  className="form-control pi_input"
                  value={this.state.newPassword}
                  name="newPassword"
                  onChange={e => this.handleUserInput(e)}
                  onBlur={event => this.validationOnBlur(event, !this.state.newPasswordValid)} />
              </div>
            </div>
            <div className="form-group">
              <label className="personal_info_label mb-0">
                Confirm New Password
              </label>
              <div className={!this.state.confirmNewPasswordValid ? "pos_relative has_error" : "pos_relative"}>
                <input
                  type="password"
                  className="form-control pi_input"
                  value={this.state.confirmNewPassword}
                  name="confirmNewPassword"
                  onChange={e => this.handleUserInput(e)}
                  onBlur={event => this.validationOnBlur(event, !this.state.confirmNewPasswordValid)} />
              </div>
            </div>
            <button type="submit" onClick={(e) => this.postChangePassword(e)}>Save</button>
            {
              this.state.activateErrorBox &&
              <ValidationMessage closeValidation={this.closeValidation} errorList={this.state.errorList} />
            }
            {
              this.state.successFlag &&
              <div className="successContainer">Password changed successfully.</div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
