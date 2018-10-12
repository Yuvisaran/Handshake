import React, { Component } from 'react';
import header_logo from '../assets/images/logo1.png';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container-fluid height60 bg-violet align-self-end padT15">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-12 col-12 align-self-center responsive_pad">
                <p className="copyright_Txt margBT0">Copyright © 2018 Handshake LLC</p>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 align-self-center">
                <ul className="footer_links margBT0">
                  <li><a href="">ABOUT</a></li>
                  <li><a href="/contact">CONTACT</a></li>
                  <li><a href="">TERMS OF USE</a></li>
                  <li><a href="">PRIVACY POLICY</a></li>
                  <li><a href="">SITEMAP</a></li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-12 col-12 align-self-center xs-center">
                {/* <p className="header_title justify-content-end text-right margBT0">HandShake</p> */}
                <img src={header_logo} title="Handshake" alt="Handshake" width="180" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
