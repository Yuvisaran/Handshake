import React, { Component, Fragment } from "react";
import { browserHistory } from 'react-router';
import detailImg from '../assets/images/detail-img.png';
import API from '../global/API'
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';

class SellerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorFlag: false,
            activePropertyList: '',
            openDropDown: '',
            isDrop: false
        }
        if (localStorage.getItem('ecrypt_data') !== null) {
            //  this.context.history.pushState(null, null,'/');
            window.onpopstate = function (event) {
                this.history.go(1);
            };
        }
        // if (localStorage.getItem('ecrypt_data') == null) {
        //     console.log("dsfsdfdsffsfsfsdff");
        //     this.props.history.push('/');
        // }
        // if (localStorage.getItem('ecrypt_data') != null) {
        //    this.history.pushState(null, window.location.href);
        //    this.window.onpopstate = function (event) {
        //    this.props.history.go(1);
        //     };
            
        // }
    }
    componentWillMount() {
        let getActiveProperties = API.GET(`property/`);
        getActiveProperties
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    this.setState({ errorFlag: true });
                    return response.json();
                }
            }
            ).then(responseData => {
                if (!this.state.errorFlag) {
                    console.log('activeProperty', responseData.results)
                    this.setState({ activePropertyList: responseData.results });
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
    viewProperty = () => {
        browserHistory.push('/property-detail');
    }
    render() {
        const { activePropertyList, isDrop, openDropDown } = this.state;
        return (
            <section className="seller_dashboard">
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
                <section className="active_property">
                    <table className="active_property_list">
                        <thead>
                            <tr>
                                <th width="8%">&nbsp;</th>
                                <th width="34%">Address</th>
                                <th width="10%" className="text-center">New Offers</th>
                                <th width="15%" className="text-center">In Negotiation</th>
                                <th width="10%" className="text-center">Declined</th>
                                <th width="15%" className="text-center">Views</th>
                                <th width="8%">Respond to Offer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="table-header">
                                <td>&nbsp;</td>
                                <td colSpan="6">Active Properties</td>
                            </tr>
                            <tr className="table-rows active">
                                <td colSpan="7">
                                    {activePropertyList.length > 0 && <table>
                                        <tbody>
                                            {activePropertyList.map((items, key) => {
                                                return (
                                                    <Fragment key={key}>
                                                        <tr>
                                                            <td width="8%" className="pd30-L" onClick={() => this.setState({ openDropDown: key, isDrop: !this.state.isDrop })}>
                                                                <span className={this.state.isDrop && openDropDown === key ? 'ico-down-arrow' : 'droprotate1'}></span>
                                                            </td>
                                                            <td width="34%" onClick={() => {
                                                               browserHistory.push({
                                                                    pathname: "/sellerviewproperty",
                                                                    state: { id: items.id }
                                                                })
                                                            }}>{items.address.apt} {items.address.street_address}, {items.address.city}, {items.address.state} {items.address.zipcode}</td>
                                                            <td width="10%" className="text-center">{items.new_offers}</td>
                                                            <td width="15%" className="text-center">{items.in_negotiation}</td>
                                                            <td width="10%" className="text-center">{items.declined}</td>
                                                            <td width="15%" className="text-center">{items.views}</td>
                                                            <td width="8%" className="text-center">
                                                                <a href="javascript:;" className="ico-right-arrow"></a>
                                                            </td>
                                                        </tr>
                                                        {openDropDown === key && isDrop && <tr className="property_detail">
                                                            <td colSpan="7">
                                                                <div className="detail_box">
                                                                    <div className="row">
                                                                        <div className="col-sm-3 col-3">
                                                                            <img src={items.featured_img} className="img-fluid height-160" />
                                                                        </div>
                                                                        <div className="col-sm-4 col-4">
                                                                            <div className="row">
                                                                                <div className="col-sm-4 col-4 prop-count-detail">
                                                                                    <div className="count">{items.num_of_bedrooms}</div>
                                                                                    <div className="count-title">Beds</div>
                                                                                </div>
                                                                                <div className="col-sm-4 col-4 prop-count-detail">
                                                                                    <div className="count">{items.num_of_bathrooms}</div>
                                                                                    <div className="count-title">Baths</div>
                                                                                </div>
                                                                                <div className="col-sm-4 col-4 prop-count-detail">
                                                                                    <div className="count">{items.square_footage}</div>
                                                                                    <div className="count-title">SQ FT</div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row mrg10-T">
                                                                                <div className="col-sm-12 col-12 prop-count-detail">
                                                                                    <div className="count green">{items.list_price}</div>
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
                                                                            {items.property_inclusions.map((item, index) => {
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
                <section className="active_property under_contract mrg40-T">
                    <table className="active_property_list">
                        <thead>
                            <tr>
                                <th width="8%">&nbsp;</th>
                                <th width="40%">Address</th>
                                <th width="12%" className="text-center">Buyer</th>
                                <th width="17%" className="text-center">Action Required</th>
                                <th width="13%" className="text-center">Expiration</th>
                                <th width="10%">&nbsp;</th>
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
                                                <td width="8%" className="pd30-L">
                                                    <span className="ico-down-arrow"></span>
                                                </td>
                                                <td width="40%">1324 Main St, Chicago, IL 60657</td>
                                                <td width="12%" className="text-center">Joe Y.</td>
                                                <td width="17%" className="text-center">Signature</td>
                                                <td width="13%" className="text-center">Signature</td>
                                                <td width="10%" className="text-center">
                                                    <a href="javascript:;" className="ico-right-arrow"></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr className="table-rows">
                                <td colSpan="6">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td width="8%" className="pd30-L">
                                                    <span className="ico-down-arrow"></span>
                                                </td>
                                                <td width="40%">1324 Main St, Chicago, IL 60657</td>
                                                <td width="12%" className="text-center">Joe Y.</td>
                                                <td width="17%" className="text-center">Signature</td>
                                                <td width="13%" className="text-center">Signature</td>
                                                <td width="10%" className="text-center">
                                                    <a href="javascript:;" className="ico-right-arrow"></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr className="table-rows active">
                                <td colSpan="6">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td width="8%" className="pd30-L">
                                                    <span className="ico-down-arrow"></span>
                                                </td>
                                                <td width="40%">1324 Main St, Chicago, IL 60657</td>
                                                <td width="12%" className="text-center">Joe Y.</td>
                                                <td width="17%" className="text-center">Signature</td>
                                                <td width="13%" className="text-center">Signature</td>
                                                <td width="10%" className="text-center">
                                                    <a href="javascript:;" className="ico-right-arrow"></a>
                                                </td>
                                            </tr>
                                            <tr className="property_detail">
                                                <td colSpan="6">
                                                    <div className="detail_box">
                                                        <div className="row">
                                                            <div className="col-sm-3 col-3">
                                                                <img src={detailImg} className="img-fluid height-160" />
                                                            </div>
                                                            <div className="col-sm-4 col-4">
                                                                <div className="row">
                                                                    <div className="col-sm-4 col-4 prop-count-detail">
                                                                        <div className="count">4</div>
                                                                        <div className="count-title">Beds</div>
                                                                    </div>
                                                                    <div className="col-sm-4 col-4 prop-count-detail">
                                                                        <div className="count">5</div>
                                                                        <div className="count-title">Baths</div>
                                                                    </div>
                                                                    <div className="col-sm-4 col-4 prop-count-detail">
                                                                        <div className="count">5,400</div>
                                                                        <div className="count-title">SQ FT</div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mrg10-T">
                                                                    <div className="col-sm-12 col-12 prop-count-detail">
                                                                        <div className="count green">$575,750</div>
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
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </section>
        )
    }
}

export default SellerDashboard;
