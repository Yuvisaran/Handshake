import React, { Component } from "react";
import API from "../global/API";
import { browserHistory } from 'react-router';
import leftArrow from '../assets/images/left-arrow.png';
import rightArrow from '../assets/images/right-arrow.png';
import downArrow from '../assets/images/down-arrow.png';
import upArrow from '../assets/images/up-arrow.png';
import { Carousel } from "../carousel/react-responsive-carousel";
import "../carousel/react-responsive-carousel/lib/styles/carousel.css";
import Notifications, { notify } from 'react-notify-toast';

class ViewProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_ImagePath: '',
      imageList: [],
      cust_ImageKey: 0,
      showImgIndex: 0,
      current_page: 1,
      records_per_page: 6,
      is_saved: "true",
      status: '',
      showPopup: false,
      unsave_id: '',
      propertyId: '',
      propertyDetails: {
        address: {

        },
        excluded_item_desc: {

        },
        mailing_address: {

        },
        property_attributes: {

        },
        property_exclusions: {

        },

        property_images: {

        },
        property_inclusions: {

        },
        property_type: {

        },
        seller_details: {

        },
        seller_type: {

        }
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleChangenext = this.handleChangenext.bind(this);
    this.handleChangeprev = this.handleChangeprev.bind(this);
    this.handelDown = this.handelDown.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    // const this = this;
    console.log('yuvi', this.props)
    console.log(this.props.location.state.id, 'prrrrrop')
    this.setState({ propertyId: this.props.location.state.id })
    console.log('propertyId', this.state.propertyId)
    let viewPropertyDetails = API.GET(`property/${this.props.location.state.id}/`);
    viewPropertyDetails
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

          this.setState({ propertyDetails: responseData });
          this.setState({ cust_ImagePath: responseData.property_images[0].img_path })
          this.setState({ imageList: responseData.property_images })
          console.log('detailsssssssss', this.state.propertyDetails)
        }
      })
  }
  prevPage() {
    if (this.state.current_page > 1) {
      this.setState({ current_page: this.state.current_page - 1 });
    }
  }
  nextPage() {
    const { current_page, records_per_page, imageList } = this.state;
    // console.log('down', current_page, records_per_page, imageList.length,
    //   (imageList.length / records_per_page) + (imageList % records_per_page ? 1 : 0))
    if (this.state.current_page < (imageList.length / records_per_page) + (imageList % records_per_page ? 1 : 0)) {
      this.setState({ current_page: current_page + 1 })
    }
  }
  allSavedList = () => {
    let getSavedPropertyList = API.GET(`save_property/`);
    getSavedPropertyList
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          this.setState({ errorFlag: true });
          return response.json();
        }
      }
      ).then(responseData => {
        console.log("all list>>>", responseData);
        if (!this.state.errorFlag) {
          responseData.results.map((val, key) => {
            if (val.property_saved.h_code == this.state.propertyDetails.h_code) {
              console.log("hcode", val.property_saved.h_code, this.state.propertyDetails.h_code);
              this.setState({ is_saved: "False" })
              this.setState({ unsave_id: val.id });
              console.log("property is alredy saved");

            } else if (val.property_saved.h_code != this.state.propertyDetails.h_code) {
              this.setState({ is_saved: "true" })
              console.log("property is not saved");
            }

          })
          this.setState({ info: responseData.results });
          console.log("this.state.is_saved", this.state.unsave_id);
        } else {
          if (responseData) {
            //   (responseData.message ? notify.show(responseData.message, 'error') : notify.show(responseData.detail, 'error')
            // )
          }
        }
        console.log("this.stree", this.state);
      })
  }
  saveProperty = (id) => {
    let data = {
      h_code: id
    }
    console.log("id", id);
    let getAwsData = API.property('save_property/', data);
    getAwsData
      .then(response => {
        // console.log("response save prop", response)
        return response.json()
      }

      ).then(responseData => {
        console.log("save responseData view>>", responseData);

        if (responseData) {
          this.setState({ is_saved: "False" })
          this.allSavedList();
          notify.show(responseData.Message, 'success');
        }


      })


  }

  changePage(page) {

    // Validate page
    if (page < 1) page = 1;
    if (page > this.numPages()) page = this.numPages();



    // for (var i = (page - 1) * this.state.records_per_page; i < (page * this.state.records_per_page) && i < this.state.imageList.length; i++) {
    //   this.setState({ startImgArray: this.state.imageList[i] })

    //   console.log('shortarray', this.state.startImgArray)

    // }

  }
  numPages() {
    return Math.ceil(this.state.imageList.length / this.state.records_per_page);
  }
  handleChange(e) {

    this.setState({ cust_ImagePath: e.target.src });
    this.setState({ cust_ImageKey: e.target.id });
    let newval = (this.state.cust_ImageKey + 1) % this.state.imageList.length;

  }
  handleChangenext(e) {
    e.preventDefault();
    let newval = (this.state.cust_ImageKey + 1) % this.state.imageList.length;
    this.setState({ cust_ImagePath: this.state.imageList[newval].img_path });
    this.setState({ cust_ImageKey: newval })
  }
  handleChangeprev(e) {
    e.preventDefault();
    let newval = this.state.cust_ImageKey != 0 ? (this.state.cust_ImageKey - 1) % this.state.imageList.length : 0;
    this.setState({ cust_ImagePath: this.state.imageList[newval].img_path });
    this.setState({ cust_ImageKey: newval })

  }
  handelDown() {
    const img_show = this.state.imageList.slice(this.state.showImgIndex, 5)
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log("tihis", this.state.showPopup);
  }
  handleSubmit() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    let info = {
      id: this.state.propertyDetails.id
    }

    let getAwsData = API.DEL(`save_property/${this.state.unsave_id}/`);
    getAwsData
      .then(response => {
        return response.json()
      }
      ).then(responseData => {
        console.log("unsave info", responseData);

        if (responseData) {
          this.setState({ is_saved: "true" })
          if (responseData.Message) {
            notify.show(responseData.Message, 'success');

          } else if (responseData.detail) {
            notify.show(responseData.detail, 'error');
          }
        }
      })
  }
  render() {

    const { records_per_page, current_page, propertyDetails } = this.state;
    const { handleChange } = this;
    // let propertyDetails = {};
    // propertyDetails.property = {}
    // propertyDetails.address = {};
    console.log(this.state, 'porporpo')


    return (
      <div>
        <div className="viewHeight">
          <Notifications />
          <section className="container-fluid bg_gray">
            <div className="container">

              <div className="row property_address_view_buyer_padding">
                <div className="col-xl-5 col-lg-5 col-md-3 col-sm-3 col-12 property_address_view_buyer">
                  <h4>{propertyDetails.street_address}</h4>
                  <p className="top-hcode">H-Code: {propertyDetails.h_code}</p>
                  <p className="address_text">{this.state.propertyDetails.address.apt}{propertyDetails.address.street_address}, {propertyDetails.address.city}</p>
                  <p className="address_text">{propertyDetails.address.state} {propertyDetails.address.zipcode}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                </div>
              </div>
            </div>
          </section>


          <section className="container-fluid">
            <div className="container">
              <div className="thumbnail-slider">
                <div className="sliderbig" style={{}}>
                  <img src={this.state.cust_ImagePath} alt='' />
                  <div className="slideLeftarrow" onClick={this.handleChangeprev}>
                    <img src={leftArrow} alt="left" /></div>
                  <div className="slideRightarrow" onClick={this.handleChangenext}>
                    <a href="javascript:void(0);" >
                      <img src={rightArrow} alt="left" />
                    </a>
                  </div>
                </div>


                <div className="slidersmall" >
                  <div className="slideDownarrow" style={{ top: 0 }} onClick={this.prevPage}>
                    <img src={upArrow} alt="left" />
                  </div>
                  <ul style={{ paddingLeft: 0 }}>
                    {this.state.imageList.map(function (name, index) {
                      if (index >= ((current_page - 1) * records_per_page) && index < (current_page * records_per_page)) {
                        return (<li key={index} onClick={handleChange}>
                          <img src={name.img_path} id={index} width="234" name='' value='abc' height="140" alt='' />
                        </li>)
                      }
                    })}
                  </ul>
                  <div className="slideDownarrow" onClick={this.nextPage}>
                    <img src={downArrow} alt="left" /></div>
                </div>
              </div>
            </div>
          </section>
          <section className="container property_detail_points">
            <div className="col-lg-8 col-md-11 col-12 center-align">
              <div className="row">
                <p className="property_View_head responsive_npadL">Property Type</p>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-7 col-sm-7 col-12 d-flex flex-row responsive_npadL responsive_property_type">
                  <div className="property_View_items_details  d-flex flex-column">
                    <p>Property Type:</p>
                    <span>{propertyDetails.property_type.p_type}</span>
                  </div>
                  <div className="property_View_items_details  d-flex flex-column">
                    <p>Property includes:</p>
                    <div className="property_View_items_details d-flex flex-column justify-content-end">
                      {propertyDetails.property_attributes.length > 0 && propertyDetails.property_attributes.map(function (val, key) {
                        return (<span key={key}>{val.property_attributes}</span>)
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 col-12 d-flex flex-row justify-content-end responsive_property_type_details">
                  <div className="dotted_border property_View_internal_detail">
                    <p>{propertyDetails.num_of_bedrooms}</p>
                    <span>BEDS</span>
                  </div>
                  <div className="property_View_internal_detail">
                    <p>{propertyDetails.num_of_bathrooms}</p>
                    <span>BATHS</span>
                  </div>
                  <div className="property_View_internal_detail">
                    <p>{propertyDetails.square_footage}</p>
                    <span>SQ FT</span>
                  </div>
                </div>
              </div>
              <div className="row margT60">
                <p className="property_View_head responsive_npadL">Property Details</p>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-5 col-12 property_View_included_items responsive_npadL">
                  <div className="property_type_custom respons_padL15">Personal Property&nbsp;<span className="green_txt">included</span>&nbsp;in sale:
                    <div className="pos_relative d-inline-flex flex-row">
                      <span className="info_property"></span>
                      <div className="pos_relative d-inline-flex flex-row">
                        <span className="info_tooltip_prop_ex_in">Add any permanent property that you woud<br /> like to include from the sale of your home
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul>
                    {propertyDetails.property_inclusions.length > 0 && propertyDetails.property_inclusions.map(function (name, index) {
                      return (<li key={index}>{name.item}</li>)
                    })
                    }
                  </ul>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12 property_View_excluded_items">
                  <div className="property_type_custom">Personal Property&nbsp;<span className="red_txt">excluded</span>&nbsp; in sale (not common):
                    <div className="pos_relative d-inline-flex flex-row">
                      <span className="info_property"></span>
                      <div className="pos_relative d-inline-flex flex-row">
                        <span className="info_tooltip_prop_ex_in property_custom_tooltip">Add any permanent property that you woud <br /> like to exclude from the sale of your home
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul>
                    {propertyDetails.excluded_item_desc.length > 0 && propertyDetails.excluded_item_desc.map(function (name, index) {
                      return (<li key={index}>{name.item_id.item}</li>)
                    })
                    }
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-12 responsive_30pad margT60">
                  <div className="row property_View_price d-flex flex-row">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-12 d-flex flex-column property_View_footer_buttons align-items-end pr-0">
                      <button className="blue_lined_button" onClick={() => { browserHistory.push('/dashboard') }}> Back </button> <button onClick={() => {
                       browserHistory.push({
                          pathname: '/editproperty',
                          state: { id: propertyDetails.id }
                        })
                      }}> Edit Details </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {this.state.showPopup ?
          <Popup
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
            submit={this.handleSubmit.bind(this)}
          />
          : null
        }
      </div>
    );

  }

}
class Popup extends React.Component {
  render() {
    console.log('this.props', this.props);
    return (

      <div className="modal fade show" id="switchModal" role="dialog" style={{ paddingRight: '17px', display: 'block' }}>
        <div className="modal-dialog"><div className="modal-content">
          <div className="modal-body">
            <h5>Are you sure?</h5><p>You want to unsave the property?</p>
          </div><div className="modal-footer">
            <button type="button" className="btn btn-default first" onClick={this.props.closePopup} data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-default second" onClick={this.props.submit} data-dismiss="modal">Yes</button>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
export default ViewProperty;
