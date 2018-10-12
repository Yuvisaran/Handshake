import React from 'react'

class BuyerDashboardOfferSummary extends React.Component {
    render() {
        return (
            <div>
                <header>
                    <div class="container-fluid height60 bg-violet ">
                        <div class="container">
                            <nav class="navbar navbar-expand-md navbar-dark noPadLR">
                                <div class="fgrow1"><a class="navbar-brand header_title header_logo" href="/dashboard"><img class="default-img img-fluid" src="./assets/images/logo.png" alt="" /></a></div>
                                <div class="profile_detail_responsive">
                                    <ul></ul>
                                </div>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar"><span class="navbar-toggler-icon"></span></button>
                                <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                                    <ul class="navbar-nav">
                                        <li class="nav-item"><a class="nav-link header_sublinks" href="/contact">CONTACT</a></li>
                                        <li class="nav-item"><a class="nav-link header_sublinks" href="/">SIGN IN</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </header>

                <div class="property_page property_profile_history buyer_offer_summary" id="pofile_tooltip">
                    <div class="container">
                        <div class="dashboard_container">
                            <section class="filter_section">
                                <div class="row responsive_vertical">
                                    <div class="col-md-6 col-sm-7">
                                        <label>View:</label>
                                        <select class="form-control filter_property">
                                            <option>1234 Main Street</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6 col-sm-5 text-right"><a href="/addproperty" class="btn btn-typ1">Add New Property</a></div>
                                </div>
                            </section>
                            <div class="property-detail">
                                <div class="row custom-row">
                                    <div class="col-12 col-sm-12 col-md-4 col-lg-3">
                                        <div class="property-img">
                                            <img src="./assets/images/detail-img.png" class="img-fluid" />
                                            <div class="view-count">27 Property Views</div>
                                        </div>
                                        <div class="row mrg0-LR">
                                            <div class="col-sm-3 prop-count-detail">
                                                <div class="count">4</div>
                                                <div class="count-title">Beds</div>
                                            </div>
                                            <div class="col-sm-3 prop-count-detail">
                                                <div class="count">5</div>
                                                <div class="count-title">Baths</div>
                                            </div>
                                            <div class="col-sm-6 prop-count-detail">
                                                <div class="count">5,400</div>
                                                <div class="count-title">SQ FT</div>
                                            </div>
                                        </div>
                                        <div class="row mrg10-T mrg0-LR">
                                            <div class="col-sm-12 prop-count-detail">
                                                <div class="count green">$575,750</div>
                                                <div class="count-title">LIST PRICE</div>
                                            </div>
                                        </div>
                                        <div class="detail-included-box">
                                            <div class="blue-header">Personal Property&nbsp;<span class="highlted">included</span>&nbsp;in sale:</div>
                                            <ul class="detail-included-item">
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
                                    <div class="col-12 col-sm-12 col-md-8 col-lg-9 active_property detail-list price_history">
                                        <table class="active_property_list mb-4">
                                            <thead>
                                                <tr class="table-header">
                                                    <td colspan="3" width="85%" class="pd-L table_heading">Offer Summary</td>
                                                    <td colspan="1" width="15%" class=" text-right pr-0">
                                                        <span class="offer_expiring offer_expiration">Offer Expires <br /> <span>42 Hours</span></span>
                                                    </td>
                                                </tr>
                                                <tr class="introduction_block">
                                                    <th colspan="4">
                                                        <p>
                                                            The seller has countered your offer. The following items have been edited by the seller:
                                                <ul>
                                                                <li>Price</li>
                                                                <li>Who pays for: Recording Fees</li>
                                                                <li>Who pays for: Closing Costs</li>
                                                                <li>Contingencies: Home Disclosure</li>
                                                                <li>Contingencies:Additional Contingencies </li>
                                                            </ul>
                                                            Below, you can review the details of the edits <span class="highlight"> highlighted in green. </span>
                                                        </p>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="text-left pd5-LR " width="25%">Offer Price History</th>
                                                    <th class="text-left" width="25%">Earnest Money History</th>
                                                    <th class="text-left" width="25%">Closing Date</th>
                                                    <th class="text-left" width="25%">Possession Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="table-rows selected_counter">
                                                    <td class="f-green text-left"><span class="highlight">$525,000<small>Bob</small></span></td>
                                                    <td class="f-green text-left">$3,100</td>
                                                    <td class="f-green text-left">April 27, 2018</td>
                                                    <td class="f-green text-left">May 1, 2018</td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left"><span class="">$519,999<small>You</small></span></td>
                                                    <td class="text-left">$3,100</td>
                                                    <td class="text-left">April 27, 2018</td>
                                                    <td class="text-left">April 28, 2018</td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left"><span class="">$519,999<small>You</small></span></td>
                                                    <td class="text-left">$3,100</td>
                                                    <td class="text-left">April 27, 2018</td>
                                                    <td class="text-left">April 28, 2018</td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left"><span class="">$519,999<small>You</small></span></td>
                                                    <td class="text-left">$3,100</td>
                                                    <td class="text-left">April 27, 2018</td>
                                                    <td class="text-left">April 28, 2018</td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left"><span class="">$519,999<small>You</small></span></td>
                                                    <td class="text-left">$3,100</td>
                                                    <td class="text-left">April 27, 2018</td>
                                                    <td class="text-left">April 28, 2018</td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left"><span class="">$519,999<small>You</small></span></td>
                                                    <td class="text-left">$3,100</td>
                                                    <td class="text-left">April 27, 2018</td>
                                                    <td class="text-left">April 28, 2018</td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left"><span class="">$519,999<small>You</small></span></td>
                                                    <td class="text-left">$3,100</td>
                                                    <td class="text-left">April 27, 2018</td>
                                                    <td class="text-left">April 28, 2018</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table class="active_property_list active_property_table pay_for_What">
                                            <thead>
                                                <tr class="table-header">
                                                    <td colspan="3" class="pd-L table_heading">Who Pays for What? <span class="info_property"></span>
                                                        <div class="pos_relative d-inline-flex flex-row">
                                                            <span class="info_tooltip_addprop">The property has an active lease or rental agreement</span>
                                                        </div>
                                                    </td>
                                                    <td colspan="1" class="pd-L table_heading text-right pr-4"><a href=""><img src="./assets/images/down-arrow.png" class="img-fluid" alt="" /></a></td>
                                                </tr>
                                                <tr>
                                                    <th width="7%">&nbsp;</th>
                                                    <th class="text-left " width="50%">Item</th>
                                                    <th class="text-center" width="36%">Buyer/Seller</th>
                                                    <th width="7%">&nbsp;</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <table class="active_property_list active_property_table pay_for_What inner_table only_buyer_seller">
                                            <tbody>
                                                <tr class="table-rows">
                                                    <td class="pt-1"></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left ">
                                                        <h2 class="">Lender Fees</h2>
                                                        <p>Lender ordered appraisals, credit reports, underwriting fees, mortgage points, loan document preparation fees, etc.</p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn buyer">Buyer</button>
                                                    </td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left ">
                                                        <h2>Pre-Paid Items</h2>
                                                        <p>Pre-paid mortgage interest, pre-paid property taxes, pre-paid escrow balances, pre-paid HOA dues, pre-paid insurance premiums, etc. </p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn buyer ">Buyer</button>

                                                    </td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left ">
                                                        <h2>Lender's Title Insurance</h2>
                                                        <p>Standard title policy required by lender</p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn seller ">Seller</button>
                                                    </td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left ">
                                                        <h2>Owner's Title Insurance</h2>
                                                        <p>Standard title policy for buyer</p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn buyer">Buyer</button>
                                                    </td>
                                                </tr>
                                                <tr class="table-rows active">
                                                    <td class="text-left ">
                                                        <h2 class="">Recording Fees</h2>
                                                        <p>City/County recordkeeping and filing fees, HOA transfer fees, etc. </p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn buyer">Buyer</button>

                                                    </td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left ">
                                                        <h2>Transfer Taxes</h2>
                                                        <p>Pre-paid mortgage interest, pre-paid property taxes, pre-paid escrow balances, pre-paid HOA dues, pre-paid insurance premiums, etc. </p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn  buyer">Buyer</button>

                                                    </td>
                                                </tr>
                                                <tr class="table-rows active">
                                                    <td class="text-left ">
                                                        <h2 class="">Closing Costs</h2>
                                                        <p>Facilitation of closing and maintenance of escrow account</p>
                                                    </td>
                                                    <td class="text-left">
                                                        <button type="button" class="status_btn buyer">Buyer</button>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                        <table class="active_property_list active_property_table contingencies">
                                            <thead>
                                                <tr class="table-header">
                                                    <td colspan="3" class="pd-L table_heading">Contingencies <span class="info_property"></span>
                                                        <div class="pos_relative d-inline-flex flex-row">
                                                            <span class="info_tooltip_addprop">The property has an active lease or rental agreement</span>
                                                        </div>
                                                    </td>
                                                    <td colspan="1" class="pd-L table_heading text-right pr-4"><a href=""><img src="./assets/images/down-arrow.png" class="img-fluid" alt="" /></a></td>
                                                </tr>
                                                <tr>
                                                    <th width="7%">&nbsp;</th>
                                                    <th class="text-left " width="50%">Task</th>
                                                    <th class="text-center" width="35%">Due Dates</th>
                                                    <th width="15%">&nbsp;</th>
                                                </tr>
                                            </thead>
                                        </table>
                                        <table class="active_property_list active_property_table contingencies inner_table">
                                            <tbody>
                                                <tr class="table-rows">
                                                    <td class="pt-1">

                                                    </td>
                                                    <td class="text-left"><span class="due_dates"></span></td>
                                                </tr>
                                                <tr class="table-rows " >
                                                    <td class="text-left" width="60%">
                                                        <h2>Earnest Money Delivery</h2>
                                                        <p>To be deposited with Escrow Agent</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates"></span></td>
                                                </tr>
                                                <tr class="table-rows active">
                                                    <td class="text-left " width="60%">
                                                        <h2>Home Inspection</h2>
                                                        <p>Choose and schedule an inspector to assist in assessing the condition of the property</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">3 Business Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Lender's Title Insurance</h2>
                                                        <p>Standard title policy required by lender</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">Waived</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Insurance Policy</h2>
                                                        <p>Confirm property is insurable at acceptable rates</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">20 Calendar Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>High Risk Area</h2>
                                                        <p>Determine if property is located in a high risk area </p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">10 Calendar Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Title Report</h2>
                                                        <p>You will receive a title report and have the opportunity to object to any concerns </p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">10 Calendar Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Appraisal</h2>
                                                        <p>Notify seller of objection if appraised value is greater than offer price</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">30 Calendar Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Home Disclosure</h2>
                                                        <p>Notify seller of objection to item(s) disclosed on the seller’s home disclosure report</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">10 Calendar Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Sale of Current Real Estate</h2>
                                                        <p>11 E Hubbard St #600, <br /> Chicago, IL 60611</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">20 Calendar Days</span></td>
                                                </tr>
                                                <tr class="table-rows">
                                                    <td class="text-left " width="60%">
                                                        <h2>Final Walk Through</h2>
                                                        <p>Ensure the property’s condition has not changed since your last visit</p>
                                                    </td>
                                                    <td class="text-left" width="20%"><span class="due_dates">(Closing Date)</span></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <br />
                                        <table class="active_property_list active_property_table additional_contingencies">
                                            <thead>
                                                <tr class="table-header">
                                                    <td colspan="7" class="pd-L table_heading">Additional Contingencies</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="table-rows">
                                                    <td class="text-left ">
                                                        <span class="check_answers">
                                                            <p class="">1. Neighbor's dog must stay in kennel <span class="status_note">Declined</span></p>

                                                            <div class="brief_text">
                                                                <p class="margBt5">Note from seller:</p>
                                                                <p>Sorry, I cannot accept this contingency becuase in convallis dui phasellus scelerisque litora dignissim platea condimentum scelerisque bibendum hac vulputate integer vulputate magna a ligula.</p>
                                                            </div>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="counter_offer pt-3 pb-3 text-center">
                        <div class="container">
                            <div class="col-sm-12 pr-0 d-inline-block text-right">
                                <button href="" class="btn btn-typ1">Send Counter Offer</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <footer>
                    <div class="container-fluid height60 bg-violet align-self-end padT15">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-12 col-12 align-self-center responsive_pad">
                                    <p class="copyright_Txt margBT0">Copyright © 2018 Handshake LLC</p>
                                </div>
                                <div class="col-lg-6 col-md-7 col-sm-12 col-12 align-self-center">
                                    <ul class="footer_links margBT0">
                                        <li><a href="">ABOUT</a></li>
                                        <li><a href="/contact">CONTACT</a></li>
                                        <li><a href="">TERMS OF USE</a></li>
                                        <li><a href="">PRIVACY POLICY</a></li>
                                        <li><a href="">SITEMAP</a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-3 col-md-2 col-sm-12 col-12 align-self-center xs-center"><img src="./assets/images/logo.png" title="Handshake" alt="Handshake" width="180" class="img-fluid" /></div>
                            </div>
                        </div>
                    </div>
                </footer> */}
            </div>
        );
    }
}
export default BuyerDashboardOfferSummary