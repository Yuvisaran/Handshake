import React, { Component } from "react";
import ViewProperty from "./ViewProperty";
import { browserHistory } from 'react-router';
import API from "../global/API";
import Notifications, { notify } from 'react-notify-toast';
class BuyPropertyHcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hcode1: "",
      hcode2: "",
      hcode3: "",
      hcode4: "",
      hcode5: "",
      hcode6: "",
      submitted: false,
      errorFlag:false,
      errors: {},
      activateErrorBox: false,
      // formErrors: { hcode1: "",hcode2: "",hcode3: "",hcode4: "",hcode5: "",hcode6: ""},
      status: 'new',
      response: ""
    };
  }
  // on change of input fields hadle change
  handleUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;
    if (fields["hcode1"] === "") {
      formIsValid = false;
      errors["hcode1"] = "Cannot be empty";
    }
    else if (typeof fields["hcode1"] === "string") {
      if (!fields["hcode1"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["hcode1"] = "Only numbers";
      }
    }
    if (fields["hcode2"] === "") {
      formIsValid = false;
      errors["hcode2"] = "Cannot be empty";
    }
    else if (typeof fields["hcode2"] === "string") {
      if (!fields["hcode2"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["hcode2"] = "Only numbers";
      }
    }
    if (fields["hcode3"] === "") {
      formIsValid = false;
      errors["hcode3"] = "Cannot be empty";
    }
    else if (typeof fields["hcode3"] === "string") {
      if (!fields["hcode3"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["hcode3"] = "Only numbers";
      }
    }
    if (fields["hcode4"] === "") {
      formIsValid = false;
      errors["hcode4"] = "Cannot be empty";
    }
    else if (typeof fields["hcode4"] === "string") {
      if (!fields["hcode4"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["hcode4"] = "Only numbers";
      }
    }
    if (fields["hcode5"] === "") {
      formIsValid = false;
      errors["hcode5"] = "Cannot be empty";
    }
    else if (typeof fields["hcode5"] === "string") {
      if (!fields["hcode5"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["hcode5"] = "Only numbers";
      }
    }
    if (fields["hcode6"] === "") {
      formIsValid = false;
      errors["hcode6"] = "Cannot be empty";
    }
    else if (typeof fields["hcode6"] === "string") {
      if (!fields["hcode6"].match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["hcode6"] = "Only numbers";
      }
    }

    this.setState({ errors: errors });
    this.setState({ submitted: formIsValid })
    return formIsValid;

  }
  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      const { hcode1, hcode2, hcode3, hcode4, hcode5, hcode6 } = this.state
      let h_code = "" + hcode1 + hcode2 + hcode3 + hcode4 + hcode5 + hcode6
      let getAwsData = API.GET(`property/view/${h_code}`);
      getAwsData
        .then(response => {
          if (response.status == 200) {
            return response.json()
          } else {
            this.setState({ errorFlag: true });
            return response.json();
          }
         
          
        }

        ).then(responseData => {
          if(!this.state.errorFlag) {
            sessionStorage.setItem('propertyDetails', JSON.stringify(responseData.property));
            browserHistory.push('/buyproperty');
          }else{
            
            (responseData.message? notify.show(responseData.message, 'error'):notify.show(responseData.detail, 'error')
          )
            
          }
        })
    }

  }


  render() {
    const { submitted } = this.state
    return (
      <div>
        {this.state.status == 'new' &&
          <div className="container-fluid login_bg mid-sction align-items-center" id="enterHcode">
            <Notifications />
            <div className="row h-code_row">
              <div className="H_CodeBox align-self-lg-center col-lg-5 col-md-12 col-sm-12 col-12">
                <div>
                  <h4>Enter H-Code:</h4>
                  <p>If you have not received an H-Code, please request one from the seller.</p>
                  <form className="pos_relative" onSubmit={this.contactSubmit.bind(this)}>
                    <div className={!this.state.hcodeValid ? 'buyproperty_hcode' : 'buyproperty_hcode '}>
                      <div className="hcode"> <input type="text"
                        placeholder=""
                        name="hcode1"
                        maxLength="1"
                        value={this.state.hcode1}
                        className={this.state.response == 404 ? "red" : "blue"}
                        onChange={event => this.handleUserInput(event)}
                      />
                        <span className="error">{this.state.errors["hcode1"]}</span>
                      </div>
                      <div className="hcode"><input type="text"
                        placeholder=""
                        name="hcode2"
                        maxLength="1"
                        value={this.state.hcode2}
                        className={this.state.response == 404 ? "red" : "blue"}
                        onChange={event => this.handleUserInput(event)}
                      />
                      <span className="error">{this.state.errors["hcode2"]}</span>
</div>
                      <div className="hcode"><input type="text"
                        placeholder=""
                        name="hcode3"
                        maxLength="1"
                        value={this.state.hcode3}
                        className={this.state.response == 404 ? "red" : "blue"}
                        onChange={event => this.handleUserInput(event)}
                      />
                      <span className="error">{this.state.errors["hcode3"]}</span>
</div>
                      {/* <span>-</span> */}
                      <div className="hcode"> <input type="text"
                        placeholder=""
                        name="hcode4"
                        maxLength="1"
                        value={this.state.hcode4}
                        className={this.state.response == 404 ? "red" : "blue"}
                        onChange={event => this.handleUserInput(event)}
                      />
                      <span className="error">{this.state.errors["hcode4"]}</span>
</div>
                      <div className="hcode"> <input type="text"
                        placeholder=""
                        name="hcode5"
                        maxLength="1"
                        value={this.state.hcode5}
                        className={this.state.response == 404 ? "red" : "blue"}
                        onChange={event => this.handleUserInput(event)}
                      />
                      <span className="error">{this.state.errors["hcode5"]}</span>
</div>
                      <div className="hcode"> <input type="text"
                        placeholder=""
                        name="hcode6"
                        maxLength="1"
                        value={this.state.hcode6}
                        className={this.state.response == 404 ? "red" : "blue mrigt"}
                        onChange={event => this.handleUserInput(event)}
                      />
                      <span className="error">{this.state.errors["hcode6"]}</span>

                    </div>
                    </div>
                    {/* {
                      !this.state.hcodeValid &&
                      <span className="validation_info arrow_box">{this.state.formErrors.hcode}</span>
                    } */}
                    <button className="copy_clip_button" type="submit">View Property</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        }
        <div>

        </div>
      </div>
    );
  }
}

export default BuyPropertyHcode;




