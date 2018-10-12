import React, { Component } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notifications, { notify } from 'react-notify-toast';

class PropertyHcode extends Component {
  constructor(props) {
    super(props);
    // const H_CODE = props.propsdata.H_CODE

    this.state = {
      copied: false,
      text: props.propsdata.H_CODE
    }
    this.onCopy = this.onCopy.bind(this);
  }
  onCopy() {

    this.setState({ copied: true });
    notify.show('Successfully copied!', 'success');
  };
  gotoDashboard = (e) => {
    window.location.assign('/dashboard');
  }
  render() {
    return (

      <div>
        <div className="container-fluid login_bg mid-sction align-items-center">
          <div className="row h-code_row">
            <Notifications />
            <div className="H_CodeBox align-self-lg-center col-lg-5 col-md-12 col-sm-12 col-12">
              <div className="">
                <h4>Property H-Code:</h4>
                <p>Share this code with potential buyers.</p>
                <p className="code_text">{this.state.text}</p>

                <CopyToClipboard onCopy={this.onCopy} text={this.state.text}>
                  <button className="copy_clip_button">Copy to Clipboard</button>
                </CopyToClipboard>
                <button className="blue_lined_button" onClick={() => this.gotoDashboard()}>Go to Dashboard</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default PropertyHcode;
