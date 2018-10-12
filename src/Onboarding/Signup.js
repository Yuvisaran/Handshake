import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import API from "../global/API";
import MaskedInput from 'react-text-mask';
import ValidationMessage from "../global/ValidationMessage";
import 'react-datepicker/dist/react-datepicker.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      birth_date: null,
      password: "",
      confirm_password: "",
      first_nameValid: true,
      usernameValid: true,
      last_nameValid: true,
      phone_numberValid: true,
      birth_dateValid: true,
      passwordValid: true,
      confirm_passwordValid: true,
      formErrors: { username: "", first_name: "", last_name: "", phone_number: "", birth_date: "", password: "", confirm_password: "" },
      toggleTooltip: false,
      formValid: false,
      isEmailExist: false,
      activateErrorBox: false,
      errorList:[]
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  componentWillMount() {
    if (this.props.postSignupData.hasOwnProperty('first_name')) {
      this.setState({
        first_name: this.props.postSignupData.first_name,
        last_name: this.props.postSignupData.last_name,
        phone_number: this.props.postSignupData.phone_number,
        birth_date: moment(this.props.postSignupData.birth_date),
        password: this.props.postSignupData.password,
        confirm_password: this.props.postSignupData.confirm_password,
        username: this.props.postSignupData.username,
      });
    }
  }
  // Handle date change
  handleDateChange = date => {
    this.setState({ birth_date: date });
    if (!this.state.birth_dateValid) {
      this.validateField('birth_date', date)
    }
  }
  // On click of create account button
   submitSignupForm = () => {
    var self = this;
    let fieldsToValidate = [this.state.first_name, this.state.last_name, this.state.username, this.state.phone_number, this.state.birth_date, this.state.password, this.state.confirm_password];
    let fieldsKeys = ['first_name', 'last_name', 'username', 'phone_number', 'birth_date', 'password', 'confirm_password'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) {
        let signupData = {};
        signupData.first_name = self.state.first_name;
        signupData.last_name = self.state.last_name;
        signupData.username = self.state.username;
        signupData.phone_number = (self.state.phone_number).replace(/-/g , "");
        signupData.password = self.state.password;
        signupData.confirm_password = self.state.confirm_password;
        signupData.birth_date = moment(self.state.birth_date._d).format('YYYY-MM-DD');
        self.props.getSignupData(signupData);
        self.props.currTab('termsofService');
      }
      else self.setState({ activateErrorBox: true });
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false, errorList: [] });
    }, 5000)
  }
  // on change of input fields hadle change
  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let formErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let first_nameValid = this.state.first_nameValid;
    let last_nameValid = this.state.last_nameValid;
    let phone_numberValid = this.state.phone_numberValid;
    let birth_dateValid = this.state.birth_dateValid;
    let passwordValid = this.state.passwordValid;
    let confirm_passwordValid = this.state.confirm_passwordValid;
    let errorList = this.state.errorList;

    switch (fieldName) {

        /*case 'first_name':
          first_nameValid = value.match(/^[a-zA-Z]{2,50}$/i) && value.length;
          if(!first_nameValid) {
            if(this.state.errorList.indexOf('Please enter a valid First Name.') === -1) errorList.push('Please enter a valid First Name.');
          }
          else {
            if(this.state.errorList.indexOf('Please enter a valid First Name.') > -1) {
              let getIndex = this.state.errorList.indexOf('Please enter a valid First Name.');
              errorList.splice(getIndex, 1)
            }
          }
          break;
        case 'last_name':
          last_nameValid = value.match(/^[a-zA-Z]{2,50}$/i) && value.length;;
          if(!last_nameValid) {
            if(this.state.errorList.indexOf('Please enter a valid Last Name.') === -1) errorList.push('Please enter a valid Last Name.');
          }
          else {
            if(this.state.errorList.indexOf('Please enter a valid Last Name.') > -1) {
              let getIndex = this.state.errorList.indexOf('Please enter a valid Last Name.');
              errorList.splice(getIndex, 1)
            }
          }
          break;
        case 'username':
          usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value.length;
          if(!usernameValid) {
            if(this.state.errorList.indexOf('Please enter a valid email address.') === -1) errorList.push('Please enter a valid email address.');
          }
          else {
            if(this.state.errorList.indexOf('Please enter a valid email address.') > -1) {
              let getIndex = this.state.errorList.indexOf('Please enter a valid email address.');
              errorList.splice(getIndex, 1)
            }
          }
          break;
        case 'phone_number':
          phone_numberValid = value.match(/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/) && value.length;
          if(!phone_numberValid) {
            if(this.state.errorList.indexOf('Please enter a valid phone number.') === -1) errorList.push('Please enter a valid phone number.');
          }
          else {
            if(this.state.errorList.indexOf('Please enter a valid phone number.') > -1) {
              let getIndex = this.state.errorList.indexOf('Please enter a valid phone number.');
              errorList.splice(getIndex, 1)
            }
          }
          break;
        case 'birth_date':
          if(value === null) {
            birth_dateValid = false;
            if(!birth_dateValid) {
              if(this.state.errorList.indexOf('Please enter valid birthdate.') === -1) errorList.push('Please enter valid birthdate.');
            }
            else {
              if(this.state.errorList.indexOf('Please enter valid birthdate.') > -1) {
                let getIndex = this.state.errorList.indexOf('Please enter valid birthdate.');
                errorList.splice(getIndex, 1)
              }
            }
          }
          else {
            birth_dateValid = true;
            if(!birth_dateValid) {
              if(this.state.errorList.indexOf('Please enter valid birthdate.') === -1) errorList.push('Please enter valid birthdate.');
            }
            else {
              if(this.state.errorList.indexOf('Please enter valid birthdate.') > -1) {
                let getIndex = this.state.errorList.indexOf('Please enter valid birthdate.');
                errorList.splice(getIndex, 1)
              }
            }
          }
          break;
        case 'password':
          passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 8 && value.length;
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
          break;*/


       case 'first_name':
        if(value.length) {
          first_nameValid = value.match(/^[a-zA-Z ]{2,30}$/i);
          formErrors.first_name = first_nameValid ? '' : 'Incorrect first name';
        }
        else {
          first_nameValid = false;
          formErrors.first_name = first_nameValid ? '' : 'First name is mandatory';
        }
        break;
      case 'last_name':
        if(value.length) {
          last_nameValid = value.match(/^[a-zA-Z ]{2,30}$/i);
          formErrors.last_name = last_nameValid ? '' : 'Incorrect last name';
        }
        else {
          last_nameValid = false;
          formErrors.last_name = last_nameValid ? '' : 'Last name is mandatory';
        }
        break;
      case 'username':
        if(value.length) {
          usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          formErrors.username = usernameValid ? '' : 'Incorrect email address.';
        }
        else {
          usernameValid = false;
          formErrors.username = usernameValid ? '' : 'Email is mandatory';
        }
        break;
      case 'phone_number':
        if(value.length) {
          phone_numberValid = value.match(/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/);
          formErrors.phone_number = phone_numberValid ? '' : 'Incorrect phone number';
        }
        else {
          phone_numberValid = false;
          formErrors.phone_number = phone_numberValid ? '' : 'Phone number is mandatory';
        }
        break;
      case 'birth_date':
        if(value === null) {
          birth_dateValid = false;
          formErrors.birth_date = birth_dateValid ? '' : 'Birth date is mandatory';
        }
        else {
          birth_dateValid = true;
          formErrors.birth_date = birth_dateValid ? '' : 'Birth date is mandatory';
        }
        break;
      case 'password':
        if(value.length) {
          passwordValid = value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})") && value.length >= 8;
          formErrors.password = passwordValid ? '' : 'Password must have combination of letters(1 caps), special char and number';
        }
        else {
          passwordValid = false;
          formErrors.password = passwordValid ? '' : 'Password is mandatory';
        }
        break;
      case 'confirm_password':
        if(value.length) {
          confirm_passwordValid = value === this.state.password;
          formErrors.confirm_password = confirm_passwordValid ? '' : 'Password does not match';
        }
        else {
          confirm_passwordValid = false;
          formErrors.confirm_password = confirm_passwordValid ? '' : 'Confirm password is mandatory';
        }
        break;
      default:
        break;
    }
    this.setState({
      errorList,
      formErrors,
      usernameValid,
      first_nameValid,
      last_nameValid,
      phone_numberValid,
      birth_dateValid,
      passwordValid,
      confirm_passwordValid
    }, this.validateForm);
  }
  // Validate form is any field ha an error?
  validateForm() {
    this.setState({ formValid: this.state.usernameValid && this.state.first_nameValid && this.state.last_nameValid && this.state.phone_numberValid && this.state.birth_dateValid && this.state.passwordValid && this.state.confirm_passwordValid && this.state.username.length && this.state.first_name.length && this.state.last_name.length && this.state.phone_number.length && this.state.birth_date !== null && this.state.password.length && this.state.confirm_password.length });
  }
  // check whether user is already registered with portal
  verifyEmail = (event, val) => {
    if (val) {
      const { name, value } = event.target;
      this.setState({ [name]: value }, () => this.validateField(name, value));
    }
    if(this.state.username.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && this.state.username.length) {
      fetch(`${API.basePath}user/email_exist/?email=${this.state.username}`, {
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
        this.setState({ isEmailExist: responseData.is_exist });
      })
    }
  }
  // show hide tooltip
  showTooltip = () => this.setState({ toggleTooltip: !this.state.toggleTooltip });
  hideEmailVerBar = () => {
    this.setState({
      isEmailExist: !this.state.isEmailExist,
      username: ''
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
        <div className="crtAcc_form">
          {
            this.state.isEmailExist &&
            <div className="info-box">
              You are registered user of HandShake, please login to explore more.
              <a href="javascript:;" className="close-ico" onClick={() => this.hideEmailVerBar()}>x</a>
            </div>
          }
          <form>
            <div className="login_input_box form-group margBT0">
              <div className="d-flex flex-row responsive_display_column">
                <div className={!this.state.first_nameValid ? "pos_relative has_error margBT36 margRespR10" : "pos_relative margRespR10"}>
                {
                  !this.state.first_nameValid &&
                  <span className="validation_info arrow_box">{this.state.formErrors.first_name}</span>
                }
                  <input
                    type="text"
                    className="form-control half_input"
                    placeholder="First Name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={event => this.handleUserInput(event)}
                    onBlur={event => this.validationOnBlur(event, !this.state.first_nameValid)} />
                </div>
                <div className={!this.state.last_nameValid ? "pos_relative has_error margBT36 margRespR10" : "pos_relative margRespR10"}>
                  {
                    !this.state.last_nameValid &&
                    <span className="validation_info arrow_box">{this.state.formErrors.last_name}</span>
                  }
                  <input
                    type="text"
                    className="form-control half_input"
                    placeholder="Last Name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={event => this.handleUserInput(event)}
                    onBlur={event => this.validationOnBlur(event, !this.state.last_nameValid)} />
                </div>
              </div>
              <div className={!this.state.usernameValid ? "pos_relative has_error margBT36" : "pos_relative margRespR10"}>
              {
                !this.state.usernameValid &&
                <span className="validation_info arrow_box">{this.state.formErrors.username}</span>
              }
                <input
                  type="email"
                  className="form-control full_input"
                  placeholder="Email Address"
                  name="username"
                  value={this.state.username}
                  onChange={event => this.handleUserInput(event)}
                  onBlur={(event) => this.verifyEmail(event, !this.state.usernameValid)} />
              </div>
              <div className="d-flex flex-row responsive_display_column">
                <div className={!this.state.phone_numberValid ? "pos_relative has_error margBT36 margRespR10" : "pos_relative margRespR10"}>
                {
                  !this.state.phone_numberValid &&
                  <span className="validation_info arrow_box">{this.state.formErrors.phone_number}</span>
                }
                <MaskedInput
                    mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    className="form-control half_input"
                    placeholder="Phone Number"
                    guide={false}
                    id="my-input-id"
                    name="phone_number"
                    value={this.state.phone_number}
                    onChange={event => this.handleUserInput(event)}
                    onBlur={event => this.validationOnBlur(event, !this.state.phone_numberValid)}
                  />
                </div>
                <div className={!this.state.birth_dateValid ? "birthdate_input has_error margBT36 margRespR10" : "birthdate_input margRespR10"}>
                  {
                    !this.state.birth_dateValid &&
                    <span className="validation_info arrow_box">{this.state.formErrors.birth_date}</span>
                  }
                  <DatePicker
                    onChange={this.handleDateChange}
                    className="form-control half_input"
                    showYearDropdown
                    dropdownMode="select"
                    yearDropdownType="select"
                    minDate={moment().subtract(100, "years")}
                    maxDate={moment().subtract(18, "years")}
                    dateFormatCalendar="MMMM"
                    placeholderText="Birthdate (mm/dd/yyyy)"
                    selected={this.state.birth_date}
                    ref={el => (this.dobEl = el)}
                    id="bdayDate"
                     />
                    <span className="info_icon" onClick={() => this.showTooltip()}></span>
                    {
                      this.state.toggleTooltip &&
                      <span className="info_tooltip">You must be at least 18 years old to create an account. Please see our <a href="javascript:;" className="text_undeline">Terms of Service</a> and <a href="javascript:;" className="text_undeline">Privacy Statement</a>.</span>
                    }
                </div>
              </div>
              <div className="d-flex flex-row responsive_display_column">
                <div className={!this.state.passwordValid ? "pos_relative has_error margBT36 margRespR10" : "pos_relative margRespR10"}>
                  {
                    !this.state.passwordValid &&
                    <span className="validation_info arrow_box">{this.state.formErrors.password}</span>
                  }
                  <input
                    type="password"
                    className="form-control half_input"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={event => this.handleUserInput(event)}
                    onBlur={event => this.validationOnBlur(event, !this.state.passwordValid)} />
                </div>
                <div className={!this.state.confirm_passwordValid ? "pos_relative has_error margBT36 margRespR10" : "pos_relative margRespR10"}>
                  {
                    !this.state.confirm_passwordValid &&
                    <span className="validation_info arrow_box">{this.state.formErrors.confirm_password}</span>
                  }
                  <input
                    type="password"
                    className="form-control half_input"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    value={this.state.confirm_password}
                    onChange={event => this.handleUserInput(event)}
                    onBlur={event => this.validationOnBlur(event, !this.state.confirm_passwordValid)} />
                </div>
              </div>
            </div>
            <div className="signin_btn">
              <button type="button" className="custom_login_btn" onClick={() => this.submitSignupForm()} disabled={this.state.isEmailExist}>Create Account</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
