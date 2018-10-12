import React, { Component, Fragment } from "react";
import { browserHistory } from 'react-router';
import API from '../global/API'
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import Notifications, { notify } from 'react-notify-toast';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';

class BuyerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorFlag: false,
      info: '',
      openDropDown: '',
      isDrop: false
    }    
    if (localStorage.getItem('ecrypt_data') !== null) {
      //  this.context.history.pushState(null, null,'/');
      window.onpopstate = function (event) {
        this.history.go(1);
      };
    }
    // if (localStorage.getItem ('ecrypt_data') == null) {
    //   this.props.history.push('/');
    // }
    // if (localStorage.getItem('ecrypt_data') != null) {
    //   this.history.pushState(null, null, window.location.href);
    //   this.window.onpopstate = function (event) {
    //    this.history.go(1);
    //   };
    // }
  }
  
  getdetails = () => {
    browserHistory.push('/buyerhcode');
  }
  allSavedList = ()=>{
    let getSavedPropertyList = API.GET(`save_property/`);
    getSavedPropertyList
      .then(response => {
        if (response.status == 200) {
          return response.json()
        } else {
          this.setState({ errorFlag: true });
          return response.json();
        }
      }
      ).then(responseData => {
        if (!this.state.errorFlag) {
          this.setState({ info: responseData.results });
        } else {
          if(responseData){
          //   (responseData.message ? notify.show(responseData.message, 'error') : notify.show(responseData.detail, 'error')
          // )
          }
         

        }
      })
  }
  unsaveProperty = (id) => {
    console.log("id",id);
      let getAwsData = API.DEL(`save_property/${id}/`);
      getAwsData
        .then(response => {
          // console.log("response save prop", response)
          return response.json()
        }
  
        ).then(responseData => {
          console.log("unsave info", responseData);
  
          if (responseData) {
            if(responseData.Message){
              this.allSavedList();
              
              notify.show(responseData.Message, 'success');
            }else if(responseData.detail){
              notify.show(responseData.detail, 'error');
              
            }
          }
  
  
        })
  
  

  }
  getViewPropertyDetails = (h_code) => {
    console.log('h_code', h_code)
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
        if (!this.state.errorFlag) {
          sessionStorage.setItem('propertyDetails', JSON.stringify(responseData.property));
          browserHistory.push('/buyproperty');
        }
      })
  }
  componentWillMount() {
    let getSavedPropertyList = API.GET(`save_property/`);
    getSavedPropertyList
      .then(response => {
        if (response.status == 200) {
          return response.json()
        } else {
          this.setState({ errorFlag: true });
          return response.json();
        }
      }
      ).then(responseData => {
        if (!this.state.errorFlag) {
          console.log('gdsfgdfgh', responseData.results)
          this.setState({ info: responseData.results });
          responseData.results.map(() => {

          })
        } else {
          if (responseData) {
            //   (responseData.message ? notify.show(responseData.message, 'error') : notify.show(responseData.detail, 'error')
            // )
          }
        }
      })
  }
  render() {
    console.log("this.state>>>", this.state);
    const { info, openDropDown, isDrop } = this.state;
    return (
      <div>
        {/* <header>
          <div className="container-fluid height60 bg-violet ">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-dark noPadLR">
                <div className="fgrow1"><a className="navbar-brand header_title header_logo" href="/dashboard"><img className="default-img img-fluid" src="./assets/images/logo.png" alt="" /></a></div>
                <div className="profile_detail_responsive">
                  <ul></ul>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                  <ul className="navbar-nav">
                    <li className="nav-item"><a className="nav-link header_sublinks" href="/contact">CONTACT</a></li>
                    <li className="nav-item"><a className="nav-link header_sublinks" href="/">SIGN IN</a></li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header> */}
        <div className="buyer_dashboard">
        <Notifications />
          <div className="container">
            <div className="dashboard_container">
              <section className="seller_dashboard">
                <section className="filter_section">
                  <div className="row responsive_vertical">
                    <div className="col-sm-7 col-md-6">
                      <label>View:</label>
                      <select className="form-control filter_property">
                        <option>All Properties</option>
                      </select>
                    </div>
                    <div className="col-sm-5 col-md-6 text-right"><a onClick={() => this.getdetails()} className="btn btn-typ1">Add New H-Code</a></div>
                  </div>
                </section>
                <section className="active_property">
                  <table className="active_property_list">
                    <thead>
                      <tr>
                        <th width="6%">&nbsp;</th>
                        <th width="30%">Address</th>
                        <th className="text-left" width="30%">Status</th>
                        <th className="text-left pl-3" width="14%">Offer Expiration</th>
                        <th className="text-left pr-5" width="10%">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-header">
                        <td>&nbsp;</td>
                        <td colSpan="4">Properties</td>
                      </tr>
                      <tr className="table-rows">
                        <td colSpan="5">
                          <table>
                            <tbody>
                              <tr>
                                <td className="pd30-L" width="6%"><span className="ico-down-arrow"></span></td>
                                <td width="30%" className="f-bold">1324 Main St, Chicago, IL 60657</td>
                                <td width="30%" className="text-left status">Seller Request</td>
                                <td width="14%" className="text-left expiration-text pl-3">24 Hours</td>

                                <td width="10%" className="text-right pr-5"><a href="javascript:;" className="ico-right-arrow"></a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="table-rows">
                        <td colSpan="5">
                          <table>
                            <tbody>
                              <tr>
                                <td className="pd30-L" width="6%"><span className="ico-down-arrow"></span></td>
                                <td width="30%" className="f-bold">1324 Main St, Chicago, IL 60657</td>
                                <td width="30%" className="text-left status">Offer Submitted</td>
                                <td width="14%" className="text-left expiration-text pl-3">11 Hours</td>

                                <td width="10%" className="text-right pr-5"><a href="javascript:;" className="ico-right-arrow"></a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="table-rows">
                        <td colSpan="5">
                          <table>
                            <tbody>
                              <tr>
                                <td className="pd30-L" width="6%"><span className="ico-down-arrow"></span></td>
                                <td width="30%" className="f-bold">1324 Main St, Chicago, IL 60657</td>
                                <td width="30%" className="text-left status">&nbsp;</td>
                                <td width="8%" className="text-left expiration-text pl-3">&nbsp;</td>

                                <td width="16%" className="text-right pr-5"><a href="javascript:;" className="ico-right-arrow"></a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr className="table-rows">
                        <td colSpan="5">
                          <table>
                            <tbody>
                              <tr>
                                <td className="pd30-L" width="6%"><span className="ico-down-arrow"></span></td>
                                <td width="30%" className="f-bold">1324 Main St, Chicago, IL 60657</td>
                                <td width="30%" className="text-left status">Declined</td>
                                <td width="8%" className="text-left expiration-text pl-3">&nbsp;</td>

                                <td width="16%" className="text-right pr-5"><a href="javascript:;" className="btn_typebuyer">Submit New Offer</a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="active_property_list under_contract mt-3">
                    <thead>
                      <tr>
                        <th width="6%">&nbsp;</th>
                        <th width="34%">Address</th>
                        <th className="text-left" width="16%">Action Required</th>
                        <th className="text-left" width="10%">&nbsp;</th>
                        <th className="text-center" width="16%">Expiration</th>
                        <th className="text-left pr-5" width="24%">&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-header">
                        <td>&nbsp;</td>
                        <td colSpan="5">Under Contract</td>
                      </tr>

                      <tr className="table-rows">
                        <td colSpan="6">
                          <table>
                            <tbody>
                              <tr>
                                <td className="pd30-L" width="6%"><span className="ico-down-arrow"></span></td>
                                <td width="34%" className="f-bold">1324 Main St, Chicago, IL 60657</td>
                                <td width="16%" className="text-left status">Jim B.</td>
                                <td width="10%" className="text-center expiration-text pl-3">Complete Task</td>

                                <td width="16%" className="text-center">24 Hours</td>
                                <td width="24%" className="text-right pr-5"><a href="javascript:;" className="btn_typebuyer">View Property</a></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="active_property_list saved_properties mt-3">

                    <tbody>
                      <tr className="table-header">
                        <td className="pd30-L">&nbsp;</td>
                        <td colSpan="5">Saved Properties</td>
                      </tr>
                      <tr className="table-rows">
                        <td colSpan="5">
                          {info.length > 0 &&
                            <table>
                              <tbody>
                                {info.map((items, key) => {
                                  return (
                                    <Fragment key={key}>
                                      <tr>
                                        <td className="pd30-L" width="6%" onClick={() => this.setState({ openDropDown: key , isDrop : !this.state.isDrop })}><span className={this.state.isDrop && openDropDown === key ? 'ico-down-arrow' : 'ico-down-arrow droprotate'}></span></td>
                                        <td width="54%" className="f-bold">{items.property_saved.address.street_address}, {items.property_saved.address.city}, {items.property_saved.address.state} {items.property_saved.address.zipcode}</td>
                                        <td width="20%" className=""><a href="javascript:;" className="btn_typeborder" onClick={() => this.unsaveProperty(items.id)}>Unsave Property</a></td>
                                        <td width="20%" className="pr-5 text-right"><a href="javascript:;" className="btn_typebuyer" onClick={() => this.getViewPropertyDetails(items.property_saved.h_code)}>View Property</a></td>
                                      </tr>
                                      {this.state.openDropDown === key && isDrop &&<tr className="property_detail">
                                        <td colSpan="6">
                                          <div className="detail_box">
                                            <div className="row">
                                              <div className="col-sm-3 col-3">
                                                <img src={items.property_img} className="img-fluid height-160" alt='Property View' />
                                              </div>
                                              <div className="col-sm-4 col-4">
                                                <div className="row">
                                                  <div className="col-sm-4 col-4 prop-count-detail">
                                                    <div className="count">{items.property_saved.num_of_bedrooms}</div>
                                                    <div className="count-title">Beds</div>
                                                  </div>
                                                  <div className="col-sm-4 col-4 prop-count-detail">
                                                    <div className="count">{items.property_saved.num_of_bathrooms}</div>
                                                    <div className="count-title">Baths</div>
                                                  </div>
                                                  <div className="col-sm-4 col-4 prop-count-detail">
                                                    <div className="count">{items.property_saved.square_footage}</div>
                                                    <div className="count-title">SQ FT</div>
                                                  </div>
                                                </div>
                                                <div className="row mrg10-T">
                                                  <div className="col-sm-12 col-12 prop-count-detail">
                                                    <div className="count green">${items.property_saved.list_price}</div>
                                                    <div className="count-title">LIST PRICE</div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-sm-5 col-5">
                                                <div className="blue-header">
                                                  <span className="align-M">
                                                    Personal Property&nbsp;
                                                             <span className="highlted">included</span>
                                                    &nbsp;in sale:
                                                         </span>
                                                  <span className="info_property align-M"></span>
                                                  <div className="pos_relative d-inline-flex flex-row">
                                                    <span className="info_tooltip_addprop">The property has an active lease or rental agreement</span>
                                                  </div>
                                                </div>
                                                {items.property_saved.property_inclusions.map((item, index) => {
                                                  return (
                                                    <ul key={index} className="detail-included-item">
                                                      <li>{item.item}</li>
                                                    </ul>)
                                                })}
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>}
                                    </Fragment>
                                  )
                                })}
                              </tbody>
                            </table>}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                {/* <section className="active_property under_contract mrg40-T">
                  <table className="active_property_list">

                    <tbody>
                      <tr className="table-header">
                        <td>&nbsp;</td>
                        <td colSpan="5">Under Contract</td>
                      </tr>
                      <tr className="table-rows">
                        <td colSpan="5">
                          <table>
                            <tbody>
                              <tr>
                                <td className="pd30-L no_offer" colSpan="5">You are not currently under contract with any properties</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section> */}

              </section>
            </div>
          </div>
        </div>
        {/* <footer>
          <div className="container-fluid height60 bg-violet align-self-end padT15">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 align-self-center responsive_pad">
                  <p className="copyright_Txt margBT0">Copyright © 2018 Handshake LLC</p>
                </div>
                <div className="col-lg-6 col-md-7 col-sm-12 col-12 align-self-center">
                  <ul className="footer_links margBT0">
                    <li><a href="">ABOUT</a></li>
                    <li><a href="/contact">CONTACT</a></li>
                    <li><a href="">TERMS OF USE</a></li>
                    <li><a href="">PRIVACY POLICY</a></li>
                    <li><a href="">SITEMAP</a></li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-12 col-12 align-self-center xs-center"><img src="./assets/images/logo.png" title="Handshake" alt="Handshake" width="180" className="img-fluid"/></div>
                </div>
              </div>
            </div>
   </footer> */}
      </div>
    )
  }
}

export default BuyerDashboard;