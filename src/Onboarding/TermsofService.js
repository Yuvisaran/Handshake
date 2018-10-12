import React, { Component } from "react";
import API from "../global/API";
import messageIco from '../assets/images/message-ico.png';

class TermsofService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openConfirmationModal: false,
      errorFlag: false,
      errorMessage: '',
      flagReadTos: false,
      openUnreadTos: false
    }
  }
  componentWillMount() {
    // If back button clicked on terms and service page
    var self = this;
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
      self.props.currTab('signup');
    };
  }
  aceeptTermsService = () => {
    if(this.state.flagReadTos) {
      let postSignupData = this.props.postSignupData;
      postSignupData.has_accepted_terms = true;
      let getData = API.NOPOST('user/register/', postSignupData);
      getData.then(data => {
        if(data.status === 200 || data.status === 201) return data.json();
        else {
          this.setState({ errorFlag: true });
          return data.json();
        }
      }).then(responseData => {
        if(!this.state.errorFlag) {
          this.setState({ openConfirmationModal: true });
        }
        else {
          this.setState({ errorMessage: 'Something went wrong.'})
          setTimeout(() => {
            this.setState({ errorFlag: false });
          }, 5000);
        }
      });
    }
    else {
      this.setState({ openUnreadTos: true });
    }
  };
  readTos = e => {
    this.setState({ flagReadTos: !this.state.flagReadTos })
  }
  declineTermsService = () => window.location.reload('/');
  closeModalPopup = () => {
    this.setState({ openConfirmationModal: false });
    window.location.reload('/');
  }
  render() {
    return (
      <div className="reset_password_box">
        <div className="forgetpass_header">
          <h2>Terms of Service</h2>
        </div>
        <div className="tos_box">
          <h4>1. Terms</h4>
          <p>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Vivamus fermentum, urna vitae maximus venenatis, lacus elit
            consectetur est, quis facilisis orci elit at felis. Ut tempor diam
            et tellus aliquet, ut commodo quam laoreet. In tellus urna,
            consequat convallis congue et, euismod in turpis.Nullam vestibulum
            finibus turpis, nec suscipit sapien imperdiet at. Mauris ut vehicula
            orci. Nam eleifend, purus eget efficitur egestas, lectus eros
            tincidunt neque, ut maximus purus ante in ante. Vestibulum accumsan
            nulla eget rutrum porta.
          </p>
          <h5>2. Use License</h5>
          <p>
            Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Vivamus fermentum, urna vitae maximus venenatis, lacus elit
            consectetur est, quis facilisis orci elit at felis. Ut tempor diam
            et tellus aliquet, ut commodo quam laoreet. In tellus urna,
            consequat convallis congue et, euismod in turpis.Nullam vestibulum
            finibus turpis, nec suscipit sapien imperdiet at. Mauris ut vehicula
            orci. Nam eleifend, purus eget efficitur egestas, lectus eros
            tincidunt neque, ut maximus purus ante in ante. Vestibulum accumsan
            nulla eget rutrum porta.
          </p>
          <div className="tos_confirm_box">
            <label className="tos_confirm">
              I have read and agree to these terms and conditions
              <input type="checkbox" defaultChecked={false} onChange={e => this.readTos(e)} />
              <span className="checkmark" />
            </label>
          </div>
          <div className="tos_btn">
            <button className="btn_blue" onClick={() => this.aceeptTermsService()}>Accept Terms</button>
            <button className="btn_white" onClick={() => this.declineTermsService()}>Decline</button>
          </div>
        </div>
        {
          this.state.openUnreadTos &&
          <div className="custom_modal">
            <div className="custom_modal_body">
              <a href="javascript:;" className="close-ico" onClick={() => this.setState({ openUnreadTos: false })}>+</a>
              <div className="custom_modal_content">
                <div className="text-center">
                  <img src={messageIco} alt="Message icon" width="36" height="30" />
                </div>
                {/* <div className="custom_modal_header">Alert!!</div> */}
                <div className="custom_modal_text">Please read and agree to these terms and conditions in order to use this service.</div>
              </div>
            </div>
          </div>
        }
        {
          this.state.openConfirmationModal &&
          <div className="custom_modal">
            <div className="custom_modal_body">
              <a href="javascript:;" className="close-ico" onClick={() => this.closeModalPopup()}>+</a>
              <div className="custom_modal_content">
                <div className="text-center">
                  <img src={messageIco} alt="Message icon" width="36" height="30" />
                </div>
                <div className="custom_modal_header">Email Confirmation</div>
                <div className="custom_modal_text">We have sent an email to {this.props.postSignupData.username}<br />Once received, follow the link to verify your email.<br /><br />If you did not receive an email, please <a href="/contact" className="underline">contact us</a>.</div>
              </div>
            </div>
          </div>
        }
        {
          this.state.errorFlag &&
          <div className="errorContainer">{ this.state.errorMessage }</div>
        }
      </div>
    );
  }
}

export default TermsofService;
