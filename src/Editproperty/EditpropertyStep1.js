import React, { Component } from "react";
import AWS from 'aws-sdk';
import API from "../global/API";
import validator from 'validator';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import ReactFileReader from 'react-file-reader';
import { Carousel } from "../carousel/react-responsive-carousel";
import "../carousel/react-responsive-carousel/lib/styles/carousel.css";
import upArrow from '../assets/images/up-arrow.png';
import rightArrow from '../assets/images/right-arrow.png';
import leftArrow from '../assets/images/left-arrow.png';
import trash from '../assets/images/trash.png';

class EditPropertyStep1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIcons: false,
      includeProperty: false,
      addPropertyObject: '',
      includePropertyNames: [],
      excludeProperty: false,
      addPropertyObjectExclude: '',
      excludePropertyNames: [],
      openDropDown: false,
      provinceName: '',
      excludedItems: [],
      includedItems: [],
      list_price: '',
      num_of_bedrooms: '',
      num_of_bathrooms: '',
      square_footage: '',
      checked: false,
      address: {
        street_address: '',
        apt: '',
        city: '',
        state: '',
        zipcode: ''
      },
      AWSData: {},
      file: '',
      imagePreviewUrl: "",
      fileList: [],
      property_images: [],
      image: "",
      testArray: [],
      submitted: false,
      num_of_acres: '',
      errors: {},
      property_inclusions: [],
      propertytype_List: [
        { id: 1, p_type: "House" }, { id: 2, p_type: "Townhome" }, { id: 3, p_type: "Condo" }, {
          id: 3, p_type: "Lot / Land"
        }
      ],
      property_type: {
        id: '',
        p_type: ''
      },
      desc: {},
      pre_approved_only: '',
      selectedOption: '',
      property_attributes: [],
      stateList: [],
      Allimage_Files: [],
      prop_attribute: [
        { id: 1, property_attributes: "Rental Property", tooltip: "The property has an active lease or rental agreement" },
        { id: 1, property_attributes: "Rented Items", tooltip: "The property is part of a homeowner's association" },
        { id: 1, property_attributes: "Leased Land", tooltip: "This is not common, examples may include certain mobile home parks or residences on forest service land. If this applies to you, please consult a specialised attorney." },
        { id: 1, property_attributes: "Homeowner’s Association", tooltip: "The property contains leased item(s) which will remain after the sale (i.e. water softener, propane tank, etc.)." },

      ],
      current_page: 1,
      records_per_page: 10,
      bannerimage: '',
      bannerimageIndex: '',
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

    this.newFileChoosen = this.newFileChoosen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitValidations = this.submitValidations.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.onHover = this.onHover.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  onHover() {
    console.log("onHovver ", this.state.showIcons)
    if (this.state.showIcons == true) {
      this.setState({ showIcons: false });
    }
    else {
      this.setState({ showIcons: true });
    }
  }

  componentWillMount() {
    console.log('dsfsd', this.props.id.id)
    let getAwsData = API.GET(`/api/states/`);
    getAwsData
      .then(response => response.json())
      .then(responseData => {
        sessionStorage.setItem('stateList', JSON.stringify(responseData));
        if (responseData.results != '' && responseData.results != null) {
          this.setState({ stateList: responseData.results });
        } else {
          let stateList = [];
          this.setState({ stateList: stateList });
        }
      })
    this.setState({ propertyId: this.props.id.id })
    console.log('propertyId', this.state.propertyId)
    let viewPropertyDetails = API.GET(`property/${this.props.id.id}/`);
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
          this.setState({ address: responseData.address });
          this.setState({ cust_ImagePath: responseData.property_images[0].img_path })
          this.setState({ imageList: responseData.property_images })
          this.setState({ provinceName: responseData.address.state });
          this.setState({ testArray: responseData.property_images });
          this.setState({ bannerimage: responseData.property_images[0].img_path });
          this.setState({ bannerimageIndex: 0 });
          this.setState({ num_of_bedrooms: responseData.num_of_bedrooms });
          this.setState({ num_of_bathrooms: responseData.num_of_bathrooms });
          this.setState({ square_footage: responseData.square_footage });
          this.setState({ list_price: responseData.list_price });
          this.setState({ pre_approved_only: responseData.pre_approved_only });
          console.log('detailsssssssssyuvi', this.state.propertyDetails)
        }
      })
  }
  isEmpty(obj) {

    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var x in obj) {
      return false;
    }

    return true;

  }
  handleUserInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleOptionChange(e) {
    let val = 'option1';
    let val2 = 'option2';
    let pre_approved_only = this.pre_approved_only;
    if (val == e.target.value) {
      pre_approved_only = true
    } else if (val2 == e.target.value) {
      pre_approved_only = false
    }

    this.setState({
      selectedOption: e.target.value, pre_approved_only: pre_approved_only
    });



  }
  addPropertyObject = () => {
    if (this.state.addPropertyObject.length) {
      let includePropertyNames = this.state.includePropertyNames;
      includePropertyNames.push(this.state.addPropertyObject)
      this.setState({ includePropertyNames, addPropertyObject: '' });
    }
  }
  handlePropertyInclude = (e) => {
    this.setState({ addPropertyObject: e.target.value });
  }
  addPropertyObjectExclude = () => {
    if (this.state.addPropertyObjectExclude) {
      let excludePropertyNames = this.state.excludePropertyNames;
      excludePropertyNames.push(this.state.addPropertyObjectExclude)
      this.setState({ excludePropertyNames, addPropertyObjectExclude: '' });
    }
  }
  handlePropertyExclude = (e) => {
    this.setState({ addPropertyObjectExclude: e.target.value });
  }
  //Select state name from dropdown
  selectProvince = (val) => {
    this.setState({ provinceName: val, openDropDown: false });
    const address = Object.assign(this.state.address, { "state": val });
    this.setState({ address })

  }
  firstStepCompleted = () => {
    this.setState({ submitted: true });
    console.log("this.state",this.state);
    let errorResponse = this.submitValidations(this.state);
    // let { property_inclusions } = this.state;
    // this.state.includedItems.map((value, key) => {
    //   let obj = {
    //     id: key + 1,
    //     item: value
    //   }
    //   property_inclusions.push(obj);
    // })
    // this.setState({ property_inclusions: property_inclusions });

    // //property exclude description
    // const excluded_desc = _.map(this.state.excludedItems, (each, key) => ({ item_id: { id: key + 1, item: each }, desc: this.state.desc[each] }))
    // sessionStorage.setItem('names', JSON.stringify(excluded_desc));
    // this.props.currentStep('step2', this.state)

    // if (this.isEmpty(errorResponse)) {
    //   this.setState({ errors: '' });

    //   let Allimage_Files = this.state.Allimage_Files;
    //   const self = this;
    //   //saving images in s3buckets
    //   let getAwsData = API.GET(`user/awsidentity/`);
    //   getAwsData
    //     .then(response => response.json())
    //     .then(responseData => {
    //       this.setState({ AWSData: responseData });
    //       // post image on s3 bucket
    //       let AwsParams = { RoleArn: this.state.AWSData.auth_role_arn, WebIdentityToken: this.state.AWSData.Token };
    //       AWS.config.region = this.state.AWSData.bucket_region;
    //       AWS.config.credentials = new AWS.WebIdentityCredentials(AwsParams, err => {
    //         // console.log(err, err.stack);
    //       }
    //       );
    //       AWS.config.credentials.get(err => {
    //         // if (err) console.log(err);
    //       });
    //       Allimage_Files.map(function (value, key) {
    //         let s3 = new AWS.S3({
    //           apiVersion: "2006-03-01",
    //           params: { Bucket: self.state.AWSData.bucket_name }
    //         });
    //         let fileName = value.name;
    //         let albumName = '';
    //         let albumPhotosKey = `${encodeURIComponent(albumName)}${self.state.AWSData.IdentityId}/`;
    //         let photoKey = albumPhotosKey + fileName;
    //         s3.upload({
    //           Key: photoKey,
    //           Body: value
    //         },
    //           function (err, data) {
    //             if (err) return console.log("There was an error uploading your photo: ", err.message);
    //             if (key == 0) {
    //               let user_avatar = { 'img_path': data.key, 'is_featured_img': true };
    //               self.state.property_images.push(user_avatar);

    //             } else {
    //               let user_avatar = { 'img_path': data.key, 'is_featured_img': false };
    //               self.state.property_images.push(user_avatar);

    //             }
    //             if (Allimage_Files.length == self.state.property_images.length) {
    //               self.props.currentStep('step2', self.state)

    //             }

    //           }
    //         );
    //       });

    //     })
    // } else {
    // }

  }
  //Include items from property
  includePropertyItems = (e) => {
    let includedItems = this.state.includedItems
    if (e.target.checked == true) {
      if (includedItems.indexOf(e.target.value) === -1) includedItems.push(e.target.value);
      this.setState({ includedItems });
    }
    else {
      if (includedItems.indexOf(e.target.value) > -1) {
        let excludedItemIndex = includedItems.indexOf(e.target.value);
        includedItems.splice(excludedItemIndex, 1);
        this.setState({ includedItems });
      }
    }


  }
  //excludeProperty description

  excludePropertydes = (e) => {
    const desc = this.state.desc;
    desc[e.target.name] = e.target.value
    this.setState({ desc })

  }

  // Exclude items from property
  excludePropertyItems = (e) => {
    let excludedItems = this.state.excludedItems
    if (e.target.checked == true) {
      if (excludedItems.indexOf(e.target.value) === -1) excludedItems.push(e.target.value);
      this.setState({ excludedItems });
    }
    else {
      if (excludedItems.indexOf(e.target.value) > -1) {
        let excludedItemIndex = excludedItems.indexOf(e.target.value);
        excludedItems.splice(excludedItemIndex, 1);
        this.setState({ excludedItems });
      }
    }
  }
  // handle address fields
  handleAddress = e => {
    let address = this.state.address;
    let { name, value } = e.target;
    address = Object.assign({
      [name]: value
    });
    this.setState({ address });
  }
  newFileChoosen(files) {
    let errors = this.state.errors;
    errors = Object.assign(errors, { image: '' })
    this.setState({ errors: errors })
    let self = this;
    for (let i = 0; i < files.base64.length; i++) {
      if (files.base64.length == 1) {
        self.setState({ image: files.base64[0] })
      }
      self.state.Allimage_Files.push(files.fileList[i]);
      self.state.testArray.push({img_path:files.base64[i]})
      console.log(" self.state.testArray", self.state.testArray);
    }
    self.setState({ testArray: self.state.testArray, Allimage_Files: self.state.Allimage_Files });
    self.setState({ testArray: self.state.testArray });
    this.setState({ bannerimage: self.state.testArray[0].img_path });
    this.setState({ bannerimageIndex: 0 });

  }
  nextPage() {
    const { current_page, records_per_page, imageList } = this.state;

    if (this.state.current_page < (this.state.testArray.length / records_per_page) + (this.state.testArray.imageList % records_per_page ? 1 : 0)) {
      this.setState({ current_page: current_page + 1 })
    }
  }
  prevPage() {
    if (this.state.current_page > 1) {
      this.setState({ current_page: this.state.current_page - 1 });
    }
  }
  handleChange(event) {
    const address = Object.assign(this.state.address, { [event.target.name]: event.target.value });
    this.setState({ address })
  }
  submitValidations(event) {
    let { address, property_type } = this.state;
    let self = this;
    let errors = {};
    this.setState({ submitted: true });
    if (event.address) {
      //address validation 
      if (validator.isEmpty(event.address.street_address)) {
        errors.street_address = 'Please enter an address';
      }
      //city validation      
      if (event.address.city) {
        if (!validator.isAlpha(event.address.city)) {
          errors.city = 'Please enter a city';
          address.city = ''
        }
      } else {
        if (validator.isEmpty(event.address.city)) {
          errors.city = 'Please enter a city';
          address.city = ''
        }
      }
      //state validation
      if (event.address.state == '') {
        errors.state = 'Please select a state';
        // if (validator.isEmpty(event.address.state)) {
        //   errors.state = 'Please select a state';
        // }
      }

      //zipcode validation
      if (event.address.zipcode) {
        if (!validator.isNumeric(event.address.zipcode)) {
          errors.zipcode = 'Invalid Zipcode';
          address.zipcode = '';
        }
        if (!(event.address.zipcode.length == 5)) {
          errors.zipcode = 'Invalid Zipcode';
          address.zipcode = '';
        }
      } else {
        if (validator.isEmpty(event.address.zipcode)) {
          errors.zipcode = 'Please enter a Zipcode';
          address.zipcode = '';
        }
      }
    }
    //property_type validation
    if (event.property_type.p_type != 'Lot / Land') {
      if (event.property_type) {
        if (validator.isEmpty(event.property_type.p_type)) {
          errors.p_type = 'Please select a property type';
          property_type.p_type = ''
        }
      }
      //num_of_bed"rooms validation
      console.log("event.num_of_bedrooms",event.num_of_bedrooms);
      if (validator.isEmpty(event.num_of_bedrooms) && !validator.isNumeric(event.num_of_bedrooms)) {
        errors.num_of_bedrooms = 'Please enter No. of bedrooms';
        // self.setState({ num_of_bedrooms: '' });
      }
      if (event.num_of_bedrooms) {
        if (!validator.isNumeric(event.num_of_bedrooms)) {
          errors.num_of_bedrooms = 'Invalid number of bedrooms. Try again';
          self.setState({ num_of_bedrooms: '' });
        }
        if (!(event.num_of_bedrooms > 0 && event.num_of_bedrooms <= 99)) {
          errors.num_of_bedrooms = 'Invalid number of bedrooms. Try again';
          self.setState({ num_of_bedrooms: '' });
        }

      }

      //num_of_bathrooms validation
      if (validator.isEmpty(event.num_of_bathrooms)) {
        errors.num_of_bathrooms = 'Please enter No. of bathrooms';
        self.setState({ num_of_bathrooms: '' });
      }

      if (event.num_of_bathrooms) {
        if (!(event.num_of_bathrooms > 0 && event.num_of_bathrooms <= 99)) {
          errors.num_of_bathrooms = 'Invalid number of bathrooms. Try again';
          self.setState({ num_of_bathrooms: '' });
        }
        if (event.num_of_bathrooms) {
          if (!validator.isNumeric(event.num_of_bathrooms)) {
            errors.num_of_bathrooms = 'Invalid number of bathrooms. Try again';
            self.setState({ num_of_bathrooms: '' });
          }
        }
      }

      //square_footage validation
      if (validator.isEmpty(event.square_footage)) {
        errors.square_footage = 'Please enter square footage';
        self.setState({ square_footage: '' });
      }
      if (event.square_footage) {
        if (!(event.square_footage.length >= 3 && event.square_footage.length <= 6)) {
          errors.square_footage = 'Invalid number of square footage. Try again';
          self.setState({ square_footage: '' });
        }
        if (!validator.isNumeric(event.square_footage)) {
          errors.square_footage = 'Invalid number of square footage. Try again';
          self.setState({ square_footage: '' });
        }

      }

    }
    //no of acres validation

    if (event.property_type.p_type == 'Lot / Land') {
      if (validator.isEmpty(event.num_of_acres)) {
        errors.num_of_acres = 'Please enter No. of acres';
        self.setState({ num_of_acres: '' });
      }
      if (!(event.num_of_acres.length >= 3 && event.num_of_acres.length <= 6)) {
        errors.num_of_acres = 'Invalid number of No. of acres. Try again';
        self.setState({ num_of_acres: '' });
      }
      if (!validator.isNumeric(event.num_of_acres)) {
        errors.num_of_acres = 'Invalid number of No. of acres. Try again';
        self.setState({ num_of_acres: '' });
      }

    }


    if (validator.isEmpty(event.list_price)) {
      errors.list_price = 'Please enter a list price';
      self.setState({ list_price: '' });
    }
    if (event.list_price) {
      if (!validator.isNumeric(event.list_price)) {
        errors.list_price = 'Invalid list price';
        self.setState({ list_price: '' });
      }
    }


    if (validator.isEmpty(event.selectedOption)) {
      errors.pre_approved_only = 'Please select preferences';
      self.setState({ pre_approved_only: '' });
    }
    if (event.testArray.length == 0) {
      errors.image = ' Please upload at least one photo';
      // self.setState({ image: '' });
    }

    self.setState({ errors: errors, address: address });
    return errors;



  }
  handlepropType(event, id) {
    let obj = {
      'id': id,
      [event.target.name]: event.target.value
    }
    const property_type = Object.assign(this.state.property_type, obj);
    this.setState({ property_type })
  }
  handleattributes(event, id) {
    let property_attributes = this.state.property_attributes;
    let obj = {
      'id': id,
      [event.target.name]: event.target.value
    }
    property_attributes.push(obj)
    this.setState({ property_attributes })


  }
  changeImage = (img, i) => {

    this.setState({ bannerimage: img, bannerimageIndex: i });


  }
  deleteImage = (img, e) => {
    this.state.testArray.splice(e, 1);
    this.state.Allimage_Files.splice(e, 1);
    this.setState(this.state.testArray);
    this.setState(this.state.Allimage_Files);

  }
  deleteBannerImage = (img, e) => {
    this.state.testArray.splice(e, 1);
    this.state.Allimage_Files.splice(e, 1);
    this.setState(this.state.testArray);
    this.setState(this.state.Allimage_Files);
    this.setState({ bannerimage: this.state.testArray[0].img_path });
    this.setState({ bannerimageIndex: 0 });
  }
  render() {

    const { address, submitted, propertytype_List, errors, property_type, prop_attribute, propertyDetails, pre_approved_only } = this.state;
    console.log("all state value", this.state)
    let listItems = this.state.stateList.map((link) =>
      <li name='state' value={address.state} key={link.state} onClick={() => this.selectProvince(link.state)}>{address.state}</li>
    );

    return (
      <div>
        <section className="container-fluid custom_property_bg" id="addPropertyStep1">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="property_address">
                  <p>Property Details</p>
                  <p className="sub_head">Address</p>
                  <label>Street Address</label>
                  <input
                    type="text"
                    className="width370"
                    name="street_address"
                    value={address.street_address}
                    onChange={this.handleChange}
                  />
                  {submitted && !address.street_address &&
                    <label className="errormessage" style={{ color: 'red' }}>{errors.street_address}</label>
                  }
                  <label>Apt / Unit</label>
                  <input
                    type="text"
                    className="width170"
                    name="apt"
                    value={address.apt}
                    onChange={this.handleChange}
                  />
                  {/* {submitted && !address.apt &&
                    <div className="errormessage" style={{ color: 'red' }}>Please enter apt</div>
                  } */}
                  <div className="display-inline">
                    <div className="flex-column margR10">
                      <label>City</label>
                      <input
                        type="text"
                        className="width170"
                        name="city"
                        value={address.city}
                        onChange={this.handleChange}
                      />
                      {submitted && !address.city &&
                        <label className="errormessage" style={{ color: 'red' }}>{errors.city}</label>
                      }
                    </div>
                    <div className="flex-column margR10 pos_relative">
                      <label>State</label>
                      {<a className="custom_dropdown d-flex pos_relative" href="javascript:;" onClick={() => this.setState({ openDropDown: !this.state.openDropDown })}>{this.state.provinceName}<i className={!this.state.openDropDown ? 'arrow down' : 'arrow up'}></i></a>}
                      {

                        this.state.openDropDown &&
                        <ul className="width70">
                          {listItems}

                        </ul>

                      }
                      {submitted && !address.state &&
                        <label className="errormessage" style={{ color: 'red' }}>{errors.state}</label>
                      }
                    </div>
                    <div className="flex-column">
                      <label>Zipcode</label>
                      <input
                        type="number"
                        className="width110"
                        name="zipcode"
                        value={address.zipcode}
                        onChange={this.handleChange}
                      />

                      {submitted && !address.zipcode &&
                        <label className="errormessage" style={{ color: 'red' }}>{errors.zipcode}</label>
                      }

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-12">
                <div className="property_pic_selection pos_relative">
                  {this.state.testArray.length > 0 && <img src={this.state.bannerimage} alt="Profile" onMouseOver={this.onHover} />

                  }
                  <div className="property_pic_upload">
                    <div className="row">
                      <div className="col-xl-6 col-md-7 col-sm-7 col-12 pl-2 pr-2 pic_upload_note">
                        <p className="big_head">Upload Photos from Your Computer</p>
                        <p className="small_head">Max image size: 200MB. You can add up to 25 photos<br /> <span>Upload the best photo first, it will be featured</span></p>
                      </div>
                      <div className="col-xl-6 col-md-5 col-sm-5 col-12 pr-2 pl-2 upload_btn_block">
                        <ReactFileReader fileTypes={[".jpg", ".png"]} base64={true} multipleFiles={true} handleFiles={this.newFileChoosen}>
                          <button disabled={this.state.testArray.length > 24}>Choose Files</button>
                        </ReactFileReader>
                        <span className="delete_img"><img src={trash} alt="" className="img-fluid" onClick={() => this.deleteBannerImage(this.state.bannerimage, this.state.bannerimageIndex)} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {this.state.testArray.length > 0 &&
          <div className="imageSliderShow">
            <div className="slideDownarrow" >
              <button className="rightArrow" onClick={this.nextPage}><img src={rightArrow} alt="left" /></button>
            </div>
            {this.state.testArray.length > 0 && this.state.testArray.map((data, index) => {
              if (index >= ((this.state.current_page - 1) * this.state.records_per_page) && index < (this.state.current_page * this.state.records_per_page)) {

                return (
                  <span key={index}>
                    <img src={data.img_path} name={'pra' + index} alt="Profile" className="slideerImage" onClick={() => this.changeImage(data.img_path, index)} />
                    <span className="delete"><img src={trash} alt="delete" href='' onClick={() => this.deleteImage(data.img_path, index)} /></span>
                  </span>
                )
              }
            })}
            <div className="slideDownarrow">
              <button className="leftArrow" onClick={this.prevPage}><img src={leftArrow} alt="left" /></button>
            </div>
          </div>
        }
        <section className="container property_detail_section add_property">
          <div className="row">
            <div className="col-lg-8 col-md-12 col-sm-12 col-12 center-align">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 pl-0">
                  <p className="property_type respons_padL15">Property Type</p>
                  <p className="property_type_custom mb-0 respons_padL15">Property Type:</p>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12 flex-column display-flex pl-0 respons_padL15">
                  <p className="label_select">Select One</p>
                  {
                    propertytype_List.map((data, index) => {
                      return (
                        <label className="custom_checkbox" key={index}>
                          {data.p_type}
                          <input type="radio" name="p_type" value={propertyDetails.property_type.p_type || data.p_type} checked={propertyDetails.property_type.p_type} onChange={data => this.handlepropType(data, index)} />
                          <span className="checkmark" />
                        </label>
                      )
                    })
                  }
                  {submitted && !property_type.p_type &&
                    <label className="errormessage" style={{ color: 'red' }}>{errors.p_type}</label>
                  }
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 flex-column display-flex respons_margT15">
                  <p className="label_select">Indicate if any of the following apply to your home</p>

                  {prop_attribute.map((data, index) => {
                    return (
                      <div className="pos_relative margBt4" key={index + 1}>
                        <label className="custom_checkbox mb-0 vert-top">
                          {data.property_attributes}
                          <input type="checkbox" name='property_attributes' value={data.property_attributes}  onChange={data => this.handleattributes(data, index + 1)} />
                          <span className="checkmark" />
                        </label>
                        <span className="info_property"></span>
                        <div className="pos_relative d-inline-flex flex-row">
                          <span className="info_tooltip_addprop">{data.tooltip}</span>
                        </div>
                      </div>

                    )
                  })
                  }

                </div>
              </div>
              <div className="row margT60">
                <p className="property_type respons_padL15">Property Details</p>
                {property_type.p_type != 'Lot / Land' &&
                  <div className="col-md-12 noPadLR prop_detail_border respons_margL15 margT10">
                    <div>
                      <input
                        type="number"
                        className={this.state.noOfBedroom != 0 ? 'bold_black' : ''}
                        placeholder=""
                        name="num_of_bedrooms"
                        value={this.state.num_of_bedrooms}
                        onChange={this.handleUserInput}
                        min="3" max="99" /><p>NO. OF BEDROOMS</p>

                      {submitted && !this.state.num_of_bedrooms &&
                        <label className="errormessage deferError" style={{ color: 'red' }}>{errors.num_of_bedrooms}</label>
                      }
                    </div>
                    <div>
                      <input type="number"
                        placeholder=""
                        className={this.state.noOfBathroom != 0 ? 'bold_black' : ''}
                        name="num_of_bathrooms"
                        value={this.state.num_of_bathrooms}
                        onChange={this.handleUserInput} min="3" max="99" /><p>NO. OF BATHROOMS</p>
                      {submitted && !this.state.num_of_bathrooms &&
                        <label className="errormessage deferError" style={{ color: 'red' }}>{errors.num_of_bathrooms}</label>
                      }
                    </div>
                    <div>
                      <input type="number"
                        placeholder=""
                        className={this.state.noOfFootage != 0 ? 'bold_black' : ''}
                        name="square_footage"
                        value={this.state.square_footage}
                        onChange={this.handleUserInput} min="111" max="999999" /><p>SQUARE FOOTAGE</p>
                      {submitted && !this.state.square_footage &&
                        <label className="errormessage deferError" style={{ color: 'red' }}>{errors.square_footage}</label>
                      }
                    </div>


                  </div>
                }
                {property_type.p_type == 'Lot / Land' &&
                  <div className="col-md-12 noPadLR prop_detail_border respons_margL15 margT10">
                    <div>
                      <input type="number"
                        placeholder=""
                        className={this.state.noOfFootage != 0 ? 'bold_black' : ''}
                        name="num_of_acres"
                        value={this.state.num_of_acres}
                        onChange={this.handleUserInput} min="111" max="999999" /><p>NO. OF ACRES</p>
                    </div>
                    {submitted && !this.state.num_of_acres &&
                      <label className="errormessage" style={{ color: 'red' }}>{errors.num_of_acres}</label>
                    }
                  </div>
                }

              </div>
              <div className="row margT60">
                <div className="col-lg-5 col-md-6 col-sm-12 col-12 pl-0 padR-26">
                  <div className="property_type_custom margBT16 respons_padL15">Personal Property&nbsp;<span className="green_txt">included</span>&nbsp;in sale:
                      <div className="pos_relative d-inline-flex flex-row">
                      <span className="info_property"></span>
                      <div className="pos_relative d-inline-flex flex-row">
                        <span className="info_tooltip_prop_ex_in">Add any permanent property that you woud<br /> like to include from the sale of your home
                          </span>
                      </div>
                    </div>
                    <div className="d-inline-flex flex-column margBT20 col-lg-6 col-md-6 col-sm-12 col-12 pl-0 respons_padL15">
                      <label className="custom_checkbox">
                        Dishwasher
                        <input type="checkbox" value="Dishwasher" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox"  >
                        Microwave
                        <input type="checkbox" value="Microwave" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox">
                        Refrigerator
                        <input type="checkbox" value="Refrigerator" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox">
                        Range/Oven
                        <input type="checkbox" value=" Range/Oven" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox">
                        Clothes Washer
                        <input type="checkbox" value="Clothes Washer" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                    </div>
                    <div className="d-inline-flex flex-column col-lg-6 col-md-6 col-sm-12 col-12 pr-0 margBT20 ">
                      <label className="custom_checkbox">
                        Clothes Dryer
                        <input type="checkbox" value="Clothes Dryer" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox">
                        Freezer(if separate)
                        <input type="checkbox" value="Freezer(if separate)" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox">
                        Garbage Disposal
                        <input type="checkbox" value="Garbage Disposal" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                      <label className="custom_checkbox">
                        Trash Compactor
                        <input type="checkbox" value="Trash Compactor" onChange={(e) => this.includePropertyItems(e)} />
                        <span className="checkmark" />
                      </label>

                    </div>

                  </div>
                  {
                    !this.state.includeProperty ?
                      <button className="d-flex blue_lined_button respons_margL15" onClick={() => this.setState({ includeProperty: !this.state.includeProperty })}>Add Items
                      </button> :
                      <div className="including_custom_property d-flex flex-column">
                        {this.state.includePropertyNames.map((data, index) => {
                          return (
                            <div className="d-inline-flex flex-column" key={index}>
                              <label className="custom_checkbox">
                                {data}
                                <input type="checkbox" value={data} onChange={(e) => this.includePropertyItems(e)} />
                                <span className="checkmark" />
                              </label>
                              {/* {
                                (this.state.includedItems.indexOf(data) !== -1) &&
                                <textarea></textarea>
                              } */}
                            </div>
                          );
                        })}
                        <div className="d-flex flex-row">
                          <input type="text" className="including_custom_property_input" value={this.state.addPropertyObject} name="includedPropertyNames" onChange={(e) => this.handlePropertyInclude(e)} />
                          <button className="d-flex blue_lined_button respons_margL15" onClick={() => this.addPropertyObject()}>Add
                        </button>
                        </div>
                      </div>
                  }
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-12 padL-26 pr-0 respons_margT30">
                  <div className="property_type_custom margBT16">Personal Property&nbsp;<span className="red_txt">excluded</span>&nbsp; in sale (not common):
                      <div className="pos_relative d-inline-flex flex-row">
                      <span className="info_property"></span>
                      <div className="pos_relative d-inline-flex flex-row">
                        <span className="info_tooltip_prop_ex_in property_custom_tooltip">Add any permanent property that you woud <br /> like to exclude from the sale of your home
                          </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-inline-flex flex-column">
                    <label className="custom_checkbox">
                      Blinds
                        <input type="checkbox" value="Blinds" onChange={(e) => this.excludePropertyItems(e)} />
                      <span className="checkmark" />
                    </label>
                    {
                      (this.state.excludedItems.indexOf('Blinds') !== -1) &&
                      <textarea name='Blinds' onChange={(e) => this.excludePropertydes(e)}></textarea>
                    }
                    <label className="custom_checkbox">
                      Faucets
                        <input type="checkbox" value="Faucets" onChange={(e) => this.excludePropertyItems(e)} />
                      <span className="checkmark" />
                    </label>
                    {
                      (this.state.excludedItems.indexOf('Faucets') !== -1) &&
                      <textarea name='Faucets' onChange={(e) => this.excludePropertydes(e)}></textarea>
                    }
                    <label className="custom_checkbox">
                      Carpet
                        <input type="checkbox" value="Carpet" onChange={(e) => this.excludePropertyItems(e)} />
                      <span className="checkmark" />
                    </label>
                    {
                      (this.state.excludedItems.indexOf('Carpet') !== -1) &&
                      <textarea name='Carpet' onChange={(e) => this.excludePropertydes(e)}></textarea>
                    }
                    <label className="custom_checkbox">
                      Light Fixtures
                        <input type="checkbox" value="Light Fixtures" onChange={(e) => this.excludePropertyItems(e)} />
                      <span className="checkmark" />
                    </label>
                    {
                      (this.state.excludedItems.indexOf('Light Fixtures') !== -1) &&
                      <textarea name='Light Fixtures' onChange={(e) => this.excludePropertydes(e)}></textarea>
                    }
                    <label className="custom_checkbox">
                      Shelving
                        <input type="checkbox" value="Shelving" onChange={(e) => this.excludePropertyItems(e)} />
                      <span className="checkmark" />
                    </label>
                    {
                      (this.state.excludedItems.indexOf('Shelving') !== -1) &&
                      <textarea name='Shelving' onChange={(e) => this.excludePropertydes(e)}></textarea>
                    }
                  </div>
                  {
                    !this.state.excludeProperty ?
                      <button className="d-flex blue_lined_button" onClick={() => this.setState({ excludeProperty: !this.state.excludeProperty })}>Add Items
                      </button> :
                      <div className="including_custom_property d-flex flex-column mt-0">
                        {this.state.excludePropertyNames.map((data, index) => {
                          return (
                            <div className="d-inline-flex flex-column" key={index}>
                              <label className="custom_checkbox" key={index}>
                                {data}
                                <input type="checkbox" value={data} onChange={(e) => this.excludePropertyItems(e)} />
                                <span className="checkmark" />

                              </label>
                              {
                                (this.state.excludedItems.indexOf(data) !== -1) &&
                                <textarea name={data} onChange={(e) => this.excludePropertydes(e)}></textarea>
                              }
                            </div>
                          );
                        })}
                        <div className="d-flex flex-row">
                          <input type="text" className="including_custom_property_input" value={this.state.addPropertyObjectExclude} name="excludedPropertyNames" onChange={(e) => this.handlePropertyExclude(e)} />
                          <button className="d-flex blue_lined_button respons_margL15" onClick={() => this.addPropertyObjectExclude()}>Add
                        </button>
                        </div>
                      </div>
                  }

                </div>
              </div>
              <div className="row margT60 margBT60">
                <div className="d-flex flex-row final_price_property">
                  <div className={this.state.list_price != 0 ? 'add_property_price d-flex flex-column margR30 green_input' : 'add_property_price d-flex flex-column margR30'}>LIST PRICE
                      <input type="number"
                      placeholder=""
                      name="list_price"
                      value={this.state.list_price}
                      onChange={this.handleUserInput} />
                    {submitted && !this.state.list_price &&
                      <label className="errormessage" style={{ color: 'red' }}>{errors.list_price}</label>
                    }
                  </div>

                  <div className="">
                    <p className="property_type">Preferences</p>
                    <div className="radio">
                      <label className="custom_checkbox">
                        <input type="radio" value="option1"
                          checked={ this.state.selectedOption === 'option1'}
                          onChange={this.handleOptionChange} />
                        <span className="checkmark" />
                        Allow offers from pre-qualified or pre-approved buyers only
                    </label>
                    </div>
                    <div className="">
                      <label className="custom_checkbox">
                        <input type="radio" value="option2"
                          checked={this.state.selectedOption === 'option2'}
                          onChange={this.handleOptionChange} />
                        <span className="checkmark" />
                        Allow all offers
                    </label>
                    </div>
                    {submitted && !this.state.pre_approved_only &&
                      <label className="errormessage" style={{ color: 'red' }}>{errors.pre_approved_only}</label>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container-fluid bg_gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-12 col-12 custom_property_footer">
                <button onClick={() => this.firstStepCompleted()}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPropertyStep1;
