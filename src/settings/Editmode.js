import React, { Component } from "react";
import API from "../global/API";
import moment from 'moment';
import ValidationMessage from "../global/ValidationMessage";
import MaskedInput from 'react-text-mask';

class Editmode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uId: '',
      birth_date: '',
      first_name: '',
      last_name:  '',
      phone_number: '',
      username: '',
      changedFields: [],
      first_nameValid: true,
      last_nameValid: true,
      phone_numberValid: true,
      formValid: false,
      successFlag: false,
      errorFlag: false,
      errorMessage: '',
      errorList: [],
      activateErrorBox: false,
    }
  }
  componentWillMount() {
    this.fetchUserDetail();
  }
  // fetch logged in user detail
  fetchUserDetail = () => {
    let getData = API.GET(`user/`);
    getData.then(data => {
      if(data.status === 200) return data.json();
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(!this.state.errorFlag) {
        let userData = responseData.results[0];
        this.setState({
          birth_date: moment(userData.birth_date).format('MMMM DD, YYYY'),
          first_name: userData.first_name,
          last_name:  userData.last_name,
          phone_number: userData.phone_number,
          username: userData.username,
          uId: userData.id
        })
      }
      else {
        this.setState({ errorMessage: responseData.message})
        setTimeout(() => {
          this.setState({ errorFlag: false });
        }, 5000);
      }
    });
  }
  changeUserData = () => {
    var self = this;
    let fieldsToValidate = [this.state.first_name, this.state.last_name, this.state.phone_number];
    let fieldsKeys = ['first_name', 'last_name', 'phone_number'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) { self.postUpdates() }
      else self.setState({ activateErrorBox: true });
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false });
    }, 5000);
  };
  // post user changes to django
  postUpdates = () => {
    let updatedData = {}
    for (let item in this.state.changedFields) {
      switch(this.state.changedFields[item]) {
        case 'first_name':
          updatedData.first_name = this.state.first_name;
          break;
        case 'last_name':
          updatedData.last_name = this.state.last_name;
          break;
        case 'phone_number':
          updatedData.phone_number = (this.state.phone_number).replace(/-/g , "");
          break;
        default:
          break;
      }
    }
    let responsePatchData = API.PATCH(`user/${this.state.uId}/`, updatedData);
    responsePatchData.then(data => {
      if(data.status === 200) {
        this.setState({ successFlag: true });
        this.props.setTab('personalInfo');
        return data.json();
      }
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(this.state.errorFlag) {
        let errorList = this.state.errorList;
        if(errorList.indexOf(responseData.message) === -1) errorList.push(responseData.message);
        this.setState({ errorList, activateErrorBox: true});
        setTimeout(() => {
          this.setState({ errorFlag: false, activateErrorBox: false, errorList: [] });
        }, 5000);
      }
    });
  }
  // Change user input
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
    if(this.state.changedFields.indexOf(e.target.name) === -1) this.state.changedFields.push(e.target.name);
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let { errorList, first_nameValid, last_nameValid, phone_numberValid } = this.state
    switch (fieldName) {
      case 'first_name':
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
        last_nameValid = value.match(/^[a-zA-Z]{2,50}$/i) && value.length;
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
      default:
        break;
    }
    this.setState({
      first_nameValid,
      last_nameValid,
      phone_numberValid,
    }, this.validateForm);
  }
  // Validate form is any field ha an error?
  validateForm() {
    this.setState({ formValid: this.state.first_nameValid && this.state.last_nameValid && this.state.phone_numberValid && this.state.first_name.length && this.state.last_name.length && this.state.phone_number.length });
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
            <h4>Personal Information</h4>
          </div>
          <form className="personal_info_edit">
            <div className="form-group">
              <label className="personal_info_label mb-0">First Name</label>
              <div className={!this.state.first_nameValid ? "pos_relative has_error" : "pos_relative"}>
                <input
                  type="text"
                  className="form-control pi_input"
                  value={this.state.first_name}
                  name="first_name"
                  onChange={e => this.handleInputChange(e)}
                  onBlur={event => this.validationOnBlur(event, !this.state.first_nameValid)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="personal_info_label mb-0">Last Name</label>
              <div className={!this.state.last_nameValid ? "pos_relative has_error" : "pos_relative"}>
                <input
                  type="text"
                  className="form-control pi_input"
                  value={this.state.last_name}
                  name="last_name"
                  onChange={e => this.handleInputChange(e)}
                  onBlur={event => this.validationOnBlur(event, !this.state.last_nameValid)}
                />

              </div>
            </div>
            <div className="form-group">
              <label className="personal_info_label mb-0">Email Address</label>
              <input
                disabled
                type="email"
                className="form-control pi_input_custom"
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <label className="personal_info_label mb-0">Phone Number</label>
              <div className={!this.state.phone_numberValid ? "pos_relative has_error" : "pos_relative"}>
                <MaskedInput
                  mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                  className="form-control pi_input"
                  guide={false}
                  id="my-input-id"
                  name="phone_number"
                  value={this.state.phone_number}
                  onChange={e => this.handleInputChange(e)}
                  onBlur={event => this.validationOnBlur(event, !this.state.phone_numberValid)}
                />
              </div>
            </div>
            <div className="form-group mb-20">
              <label className="personal_info_label mb-0">Birthdate</label>
              <input
                disabled
                type="text"
                className="form-control pi_input_custom"
                value={this.state.birth_date}
              />
            </div>
            <button type="button" disabled={!this.state.changedFields.length} onClick={() => this.changeUserData()}>Save</button>
            {
              this.state.activateErrorBox &&
              <ValidationMessage closeValidation={this.closeValidation} errorList={this.state.errorList} />
            }
            {
              this.state.successFlag &&
              <div className="successContainer">Profile updated successfully!!</div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default Editmode;
