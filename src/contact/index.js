import React, { Component } from "react";
import ValidationMessage from "../global/ValidationMessage";
import API from "../global/API";
import { browserHistory } from 'react-router';
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data")) ? JSON.parse(localStorage.getItem("ecrypt_data")) : "";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      errorFlag: false,
      successFlag: false,
      nameValid: true,
      emailValid: true,
      messageValid: true,
      activateErrorBox: false,
      errorList: []
    };
  }
  componentWillMount() {
    if(isUserLoggedIn) {
      this.setState({ name:  `${isUserLoggedIn.first_name} ${isUserLoggedIn.last_name}`, email: isUserLoggedIn.username})
    }
  }
  handleUserInput = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }
  // Validate each input fields
  validateField(fieldName, value) {
    let { emailValid, nameValid, messageValid, errorList } = this.state
    switch (fieldName) {
      case 'name':
        nameValid = value.match(/^[a-zA-Z ]{2,50}$/i) && value.length;
        if(!nameValid) {
          if(this.state.errorList.indexOf('Please enter valid Name') === -1) errorList.push('Please enter valid Name');
        }
        else {
          if(this.state.errorList.indexOf('Please enter valid Name') > -1) {
            let getIndex = this.state.errorList.indexOf('Please enter valid Name');
            errorList.splice(getIndex, 1)
          }
        }
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && value.length;
        if(!emailValid) {
          if(this.state.errorList.indexOf('Please enter valid email address') === -1) errorList.push('Please enter valid email address')
        }
        else {
          if(this.state.errorList.indexOf('Please enter valid email address') > -1) {
            let getIndex = this.state.errorList.indexOf('Please enter valid email address');
            errorList.splice(getIndex, 1);
          }
        }
        break;
      case 'message':
        messageValid = value.length;
        if(!messageValid) {
          if(this.state.errorList.indexOf('Please include a message.') === -1) errorList.push('Please include a message.');
        }
        else {
          if(this.state.errorList.indexOf('Please include a message.') > -1) {
            let getIndex = this.state.errorList.indexOf('Please include a message.');
            errorList.splice(getIndex, 1)
          }
        }
        break;
      default:
        break;
    }
    this.setState({
      errorList,
      nameValid,
      emailValid,
      messageValid
    }, this.validateForm);
    if(!this.state.errorList.length) this.setState({ activateErrorBox: false });
  }
  // Validate form is any field ha an error?
  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.emailValid && this.state.messageValid });
  }
  postMessage = () => {
    var self = this;
    let fieldsToValidate = [this.state.name, this.state.email, this.state.message];
    let fieldsKeys = ['name', 'email', 'message'];
    for(let items in fieldsToValidate) {
      setTimeout(() => {
        self.validateField(fieldsKeys[items], fieldsToValidate[items])
      }, 100);
    }
    setTimeout(() => {
      if (self.state.formValid) self.postContactData(self.state.name, self.state.email, self.state.message);
      else self.setState({ activateErrorBox: true });
    }, 100);
    setTimeout(() => {
      self.setState({ activateErrorBox: false });
    }, 5000);
  }
  // post data to django
  postContactData = (name, email, message) => {
    let contactData = { name, email, message };
    let getData = API.NOPOST('contact-us/', contactData);
    getData.then(data => {
      if(data.status === 200 || data.status === 201) return data.json();
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(!this.state.errorFlag) {
        this.setState({ successFlag: !this.state.successFlag });
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
  // Once validation message pops up then close button will close the validation
  closeValidation = (val) => {
    this.setState({ activateErrorBox: val, errorList: [] });
  }
  // close modal
  closeModal = () => {
    this.setState({ successFlag: false, message: '' });
    if(isUserLoggedIn) browserHistory.push('/dashboard');
    else browserHistory.push('/')
  }
  render() {
    return (
      <div>
        <div className="container-fluid splash_bg mid-sction">
          <div className="contact_container">
            <div className="row">
              <div className="col-sm-6">
                <div className="contact_box contact_leftbox">
                  <div className="contact_header">Contact Us</div>
                  <div className="contact_text">
                    We know selling or buying a home can be intimidating. We make it as simple as a handshake.<br /><br />Connect with us today.
                  </div>
                  <table className="contact_communication">
                    <tbody>
                      <tr>
                        <td>Phone:</td>
                        <td>(503) 821-7252</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td><a href="mailto:connect@fsboHandshake.com">connect@fsboHandshake.com</a><br /><a href="mailto:careers@fsboHandshake.com">careers@fsboHandshake.com</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="contact_box contact_rightbox">
                  <form className="personal_info_edit" action="post" onSubmit={e => this.postMessage(e)}>
                    <div className="form-group">
                      <label className="personal_info_label mb-0">Name</label>
                      <div className={!this.state.nameValid ? "pos_relative has_error" : "pos_relative"}>
                        <input
                          type="text"
                          className="form-control pi_input"
                          value={this.state.name}
                          name="name"
                          onChange={e => this.handleUserInput(e)}
                          onBlur={event => this.validationOnBlur(event, !this.state.nameValid)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="personal_info_label mb-0">Email</label>
                      <div className={!this.state.emailValid ? "pos_relative has_error" : "pos_relative"}>
                        <input
                          type="email"
                          className="form-control pi_input"
                          value={this.state.email}
                          name="email"
                          onChange={e => this.handleUserInput(e)}
                          onBlur={event => this.validationOnBlur(event, !this.state.emailValid)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="personal_info_label mb-0">Message</label>
                      <div className={!this.state.messageValid ? "pos_relative has_error" : "pos_relative"}>
                        <textarea
                          className="form-control pi_input"
                          value={this.state.message}
                          name="message"
                          onChange={e => this.handleUserInput(e)}
                          onBlur={event => this.validationOnBlur(event, !this.state.messageValid)} />
                      </div>
                    </div>
                    <button type="button" onClick={(e) => this.postMessage(e)}>Send Message</button>
                    {
                      this.state.activateErrorBox &&
                      <ValidationMessage closeValidation={this.closeValidation} errorList={this.state.errorList} />
                    }
                    {
                      this.state.successFlag &&
                      <div className="custom_modal">
                        <div className="custom_modal_body">
                          <a href="javascript:;" className="close-ico" onClick={() => this.closeModal()}>+</a>
                          <div className="custom_modal_content">
                            {/* <div className="text-center">
                                <img src={messageIco} alt="Message icon" width="36" height="30" />
                              </div> */}
                            <div className="custom_modal_header">Your Message has been Sent!</div>
                            <div className="custom_modal_text">Someone from the Handshake team will respond to you within 24 hours via email. In the meantime, you can visit our <a href="/faq" title="FAQ">FAQ</a> page to learn more. For urgent inquiries, please feel free to give us a call.</div>
                          </div>
                        </div>
                      </div>
                    }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
