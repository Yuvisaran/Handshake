import React, { Component } from "react";
import messageIco from '../assets/images/message-ico.png';
import ValidationMessage from "../global/ValidationMessage";
import API from "../global/API";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailValid: true,
      formValid: false,
      errorFlag: false,
      successFlag: false,
      errorMessage:'',
      errorList: [],
      activateErrorBox: false,
    }
  }
  componentWillMount() {
    // If back button clicked on terms and service page
    var self = this;
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
      self.props.currTab('login');
    };
  }
  // on change of input fields hadle change
  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    let errorList = this.state.errorList;
    switch (fieldName) {
      case 'email':
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
      default:
        break;
    }
    this.setState({
      emailValid,
      errorList
    }, this.validateForm);
  }
  // Validate form is any field ha an error?
  validateForm() {
    this.setState({ formValid: this.state.emailValid });
  }
  // Submit login form on click of this button
  submitForgotForm = () => {
    var self = this;
    let fieldsToValidate = [this.state.email];
    let fieldsKeys = ['email'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) self.postForgotData(self.state.email);
      else self.setState({ activateErrorBox: true });
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false });
    }, 5000);
  }
  // Post Login details
  postForgotData = (email) => {
    let forgotData = { email }
    let getData = API.NOPUT('user/forgot_password/', forgotData);
    getData.then(data => {
      if(data.status === 204 || data.status === 200) this.setState({ successFlag: true });
      else {
        this.setState({ errorFlag: true });
        setTimeout(() => {
          this.setState({ errorFlag: false });
        }, 5000);
        return data.json();
      }
    })
    .then(responseData => {
      if(this.state.errorFlag) {
        let errorList = this.state.errorList;
        if(errorList.indexOf(responseData.message) === -1) errorList.push(responseData.message);
        this.setState({ errorList, activateErrorBox: true});
        setTimeout(() => {
          this.setState({ activateErrorBox: false, errorList: [] });
        }, 5000);
      }
    });
  }
  // On click of forgot password and terms ans service link
  referPage = val => this.props.currTab(val);
  // close modal popup
  closeModalPopup = () => {
    this.setState({ successFlag: false });
    this.props.currTab('login');
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
      <div className="forget_pass_box">
        <div className="forgetpass_header">
          <h2>Forgot Your Password? {this.state.errorFlag}</h2>
        </div>
        <div className="forgotpass_input_box">
          <p className="forgetpass_text">
            Enter your email address and we’ll send you a link to reset your
            password
              </p>
          <div className={!this.state.emailValid ? "pos_relative has_error" : "pos_relative"}>
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={event => this.handleUserInput(event)}
              onBlur={event => this.validationOnBlur(event, !this.state.emailValid)}
            />
          </div>
          <div className="signin_btn">
            <button className="custom_login_btn" onClick={() => this.submitForgotForm()}>Send Email</button>
          </div>
        </div>
        {
          this.state.successFlag &&
          <div className="custom_modal">
            <div className="custom_modal_body">
              <a href="javascript:;" className="close-ico" onClick={() => this.closeModalPopup()}>+</a>
              <div className="custom_modal_content">
                <div className="text-center">
                  <img src={messageIco} alt="Message icon" width="36" height="30" />
                </div>
                <div className="custom_modal_header">Email Confirmation</div>
                <div className="custom_modal_text">We have sent an email to {this.state.email}<br />Once received, follow the link to reset your password.<br /><br />If you did not receive an email, please <a href="javascript:;" className="underline">contact us</a>.</div>
              </div>
            </div>
          </div>
        }
        {
          (this.state.activateErrorBox || this.state.errorFlag) &&
          <ValidationMessage closeValidation={this.closeValidation} errorList={this.state.errorList} />
        }
      </div>
    );
  }
}

export default ForgotPassword;
