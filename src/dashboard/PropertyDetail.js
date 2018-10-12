import React, { Component } from "react";
import detailImg from '../assets/images/detail-img.png';
import { browserHistory } from 'react-router';
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data")) ? JSON.parse(localStorage.getItem("ecrypt_data")) : "";


class PropertyDetail extends Component {
  constructor(){
    super();
    this.state = {
      showReply: false,
      requestOffer: false
    }
  }
    componentWillMount() {
    if(isUserLoggedIn) {
      this.setState({ name:  `${isUserLoggedIn.first_name} ${isUserLoggedIn.last_name}`, email: isUserLoggedIn.username})
    }
  }
  //On click of final request and offer button
  finalOffer(e){
    e.preventDefault();
    this.setState({showReply: !this.state.showReply})
  }

  //On click of final request and offer button
  requestOffer(e){
    e.preventDefault();
    this.setState({
      requestOffer: !this.state.requestOffer,
    })
  }

  // close modal
  closeModal = () => {
    this.setState({showReply: false});
    /*this.setState({ successFlag: false, message: '' });
    if(isUserLoggedIn) {
      console.log('this is user');
      browserHistory.push('/dashboard');
    } else {
      browserHistory.push('/');
    }*/
  }
  render() {
    return (
      <div className="container">
        <div className="dashboard_container">
          <section className="filter_section">
            <div className="row responsive_vertical">
              <div className="col-sm-6">
                <label>View:</label>
                <select className="form-control filter_property">
                  <option>All Properties</option>
                </select>
              </div>
              <div className="col-sm-6 text-right">
                <a href="/addproperty" className="btn btn-typ1">Add New Property</a>
              </div>
            </div>
          </section>
          <section className="property-detail">
            <div className="row custom-row">
              <div className="col-sm-3">
                <div className="property-img">
                  <img src={detailImg} className="img-fluid" />
                  <div className="view-count">27 Property Views</div>
                </div>
                <div className="row mrg0-LR">
                  <div className="col-sm-3 prop-count-detail">
                    <div className="count">4</div>
                    <div className="count-title">Beds</div>
                  </div>
                  <div className="col-sm-3 prop-count-detail">
                    <div className="count">5</div>
                    <div className="count-title">Baths</div>
                  </div>
                  <div className="col-sm-6 prop-count-detail">
                    <div className="count">5,400</div>
                    <div className="count-title">SQ FT</div>
                  </div>
                </div>
                <div className="row mrg10-T mrg0-LR">
                  <div className="col-sm-12 prop-count-detail">
                    <div className="count green">$575,750</div>
                    <div className="count-title">LIST PRICE</div>
                  </div>
                </div>
                <div className="detail-included-box">
                  <div className="blue-header">
                    Personal Property&nbsp;<span className="highlted">included</span>&nbsp;in sale:
                  </div>
                  <ul className="detail-included-item">
                    <li>Dishwasher</li>
                    <li>Microwave</li>
                    <li>Refrigerator</li>
                    <li>Range / Oven</li>
                    <li>Range / Oven</li>
                    <li>Clothes Washer</li>
                    <li>Clothes Dryer</li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-9 active_property detail-list">
                <table className="active_property_list">
                  <thead>
                    <tr>
                      <th width="15%">Buyer</th>
                      <th width="15%" className="text-center">Status</th>
                      <th width="15%" className="text-center">Pre-Qualified</th>
                      <th width="15%" className="text-center">Financing</th>
                      <th width="15%" className="text-center">Offer</th>
                      <th width="15%" className="text-center">Offer<br />Expiration</th>
                      <th width="10%">Respond to Buyer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-header">
                      <td colSpan="7">Offers</td>
                    </tr>
                    <tr className="table-rows">
                      <td className="f-bold">Jim B.</td>
                      <td className="f-green text-center">Final &amp; Best - New</td>
                      <td className="text-center"><span className="qualified-text">Yes</span></td>
                      <td className="text-center">Mortgage</td>
                      <td className="f-bold text-center">$520,000</td>
                      <td className="expiration-text text-center">40 hours</td>
                      <td width="8%" className="text-center">
                        <a href="javascript:;" className="ico-right-arrow"></a>
                      </td>
                    </tr>
                    <tr className="table-rows">
                      <td className="f-bold">Jim B.</td>
                      <td className="f-green text-center">Final &amp; Best - New</td>
                      <td className="text-center">No</td>
                      <td className="text-center">Mortgage</td>
                      <td className="f-bold text-center">$520,000</td>
                      <td className="expiration-text text-center">40 hours</td>
                      <td width="8%" className="text-center">
                        <a href="javascript:;" className="ico-right-arrow"></a>
                      </td>
                    </tr>
                    <tr className="table-rows">
                      <td className="f-bold">Jim B.</td>
                      <td className="f-green text-center">Final &amp; Best - New</td>
                      <td className="text-center"><span className="qualified-text">Yes</span></td>
                      <td className="text-center">Mortgage</td>
                      <td className="f-bold text-center">$520,000</td>
                      <td className="expiration-text text-center">40 hours</td>
                      <td width="8%" className="text-center">
                        <a href="javascript:;" className="ico-right-arrow"></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-right pos_relative mrg10-T pd30-R">
                  <a href="javascript:;" className="btn btn-typ1" onClick={this.finalOffer.bind(this)}>Request Final &amp; Best Offer</a>
                  <span className="info_property align-M"></span>
                  <div className="pos_relative d-inline-flex flex-row">
                    <span className="info_tooltip_addprop">The property has an active lease or rental agreement</span>
                  </div>
                </div>
                <table className="active_property_list mrg30-T">
                  <thead>
                    <tr>
                      <th width="20%">Buyer</th>
                      <th width="17%" className="text-center">Pre-Qualified</th>
                      <th width="17%" className="text-center">Financing</th>
                      <th width="17%" className="text-center">Offer</th>
                      <th width="18%" className="text-center">Declined On</th>
                      <th width="11%">Contact Buyer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-header">
                      <td colSpan="7">Declined Offers</td>
                    </tr>
                    <tr className="table-rows">
                      <td className="f-bold">Jim B.</td>
                      <td className="text-center"><span className="qualified-text">Yes</span></td>
                      <td className="text-center">Mortgage</td>
                      <td className="f-bold text-center">$520,000</td>
                      <td className="expiration-text text-center">40 hours</td>
                      <td className="text-center">
                        <a href="javascript:;" className="ico-right-arrow"></a>
                      </td>
                    </tr>
                    <tr className="table-rows">
                      <td className="f-bold">Jim B.</td>
                      <td className="text-center">No</td>
                      <td className="text-center">Mortgage</td>
                      <td className="f-bold text-center">$520,000</td>
                      <td className="expiration-text text-center">40 hours</td>
                      <td className="text-center">
                        <a href="javascript:;" className="ico-right-arrow"></a>
                      </td>
                    </tr>
                    <tr className="table-rows">
                      <td className="f-bold">Jim B.</td>
                      <td className="text-center"><span className="qualified-text">Yes</span></td>
                      <td className="text-center">Mortgage</td>
                      <td className="f-bold text-center">$520,000</td>
                      <td className="expiration-text text-center">40 hours</td>
                      <td className="text-center">
                        <a href="javascript:;" className="ico-right-arrow"></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {
            this.state.showReply &&
          <div className="custom_modal" id="finalOfferPopUp">
            <div className="custom_modal_body d-flex flex-column">
                 {
              !this.state.requestOffer &&
              <div className="custom_modal_content">
                <div className="custom_modal_header">
                  Final and Best Offer
                </div>
                <div className="custom_modal_text mb-30">
                    <span className="mb-30">You are about to request a Final and Best offer from all active buyers. Each buyer will receive notifications that your property is in a multiple offer situation. Buyers will be given instructions to submit their final and best offer within 48 hours.</span>
                    <span >Once you receive Final and Best offers, you can only accept or decline (you will not be able to counter)</span>
                </div></div>
              }
                 {
              this.state.requestOffer &&
              <div className="custom_modal_content" id="finalRequestPopUp">
                <div className="custom_modal_header margBT15">
                  Contact Sarah F.
                </div>
                <div className="custom_modal_text d-flex flex-column">
                    <span className="margBT15">You can request a new offer from the buyer.<br/>The buyer will receive your request and possibly submit a new offer.<br/> If this happens, you will be “in negotiation” again.</span>
                    <label>Add note to buyer:</label>
                    <textarea rows="4"/>
                </div>
              </div>
            }
                <div className="finalOfferPopUp_buttons">
                  <button onClick={() => this.closeModal()}>Cancel</button>
                  {
                     this.state.requestOffer ?
                     <button>Request New Offer</button> :
                     <button onClick={this.requestOffer.bind(this)}>Continue</button>
                   }
                </div>

            </div>
          </div>
          }




        </div>
      </div>
    )
  }

}

export default PropertyDetail;
