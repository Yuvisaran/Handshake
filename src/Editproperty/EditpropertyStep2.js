import React, { Component } from "react";
import validator from 'validator'
import API from './../global/API.js'
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

class EditPropertyStep2 extends Component {
  constructor(props) {
    super(props);
    const mailing_address2 = props.propsdata.address
    console.log("props>>>", mailing_address2);
    this.state = {
      formsubmit: false,
      escrow_company: {
        company_name: "",
        street_address: "",
        phone_number: "",
        apt: "",
        email: "",
        city: "",
        state: "",
        zipcode: ""
      },
      title_company:
      {
        company_name: "",
        street_address: "",
        phone_number: "",
        apt: "",
        email: "",
        city: "",
        state: "",
        zipcode: ""
      },
      married_couple: {
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        email: '',
      },
      mailing_address:
      {
        street_address: "",
        apt: "",
        city: "",
        state: "",
        zipcode: ""
      },
      mailing_address2: mailing_address2,
      corportion_details: {
        first_name: "",
        last_name: "",
        middle_name: "",
        phone_number: "",
        email: "",
      },
      group_details: {
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        email: '',
      },
      group_person3: {
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        email: '',
      },
      openDropDown: false,
      openDropDown1: false,
      openDropDown2: false,
      provinceName: '',
      provinceName1: '',
      provinceName2: '',
      mailing_addressChecked: false,
      title_companyChecked: false,
      escrow_companyChecked: false,
      escrow_companyCheck: false,
      married: false,
      single: false,
      corporation: false,
      group: false,
      addPerson: false,
      stateList: [],
      value1: "",
      value: "",
      seller_details: [],
      seller_type:
      {
        id: '',
        party_type: ""
      },
      errors: {
        married_couple: {
          // first_name: "", middle_name: "", last_name: "", phone_number: "", email: "",
        },
        corportion_details: {
          // legalEntityName: "", authorisedsignerName: "", authorisedsignerdesignation: "", phone_number: "", email: "",
        },
        mailing_address: {
          // street_address: "", apt: "", city: "", state: "", zipcode: ""
        },
        title_company: {
          // company_name: "", street_address: "", phone_number: "", apt: "", email: "", city: "", state: "", zipcode: ""
        },
        escrow_company: {
          // company_name: "", street_address: "", phone_number: "", apt: "", email: "", city: "", state: "", zipcode: ""
        },
        group_details: {
          // first_name: "", middle_name: "", last_name: "", phone_number: "", email: '',
        },
        group_person3: {
          // first_name: "", middle_name: "", last_name: "", phone_number: "", email: '',
        },
      }

    }
    this.submitValidations = this.submitValidations.bind(this);
    this.isEmpty = this.isEmpty.bind(this);

  }

  componentWillMount() {

    let getAwsData = API.GET(`/api/states/`);
    getAwsData
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
        localStorage.setItem('stateList', JSON.stringify(responseData));
        if (responseData.results != '' && responseData.results != null) {
          this.setState({ stateList: responseData.results });

        } else {
          let stateList = [];
          this.setState({ stateList: stateList });
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
  
  //dropdown 
  selectProvince = (val) => {
    this.setState({ provinceName: val, openDropDown: false });
    const mailing_address = Object.assign(this.state.mailing_address, { "state": val });
    this.setState({ mailing_address })

  }
  selectProvince1 = (val) => {
    this.setState({ provinceName1: val, openDropDown1: false });
    const title_company = Object.assign(this.state.title_company, { "state": val });
    this.setState({ title_company })

  }
  selectProvince2 = (val) => {
    this.setState({ provinceName2: val, openDropDown2: false });
    const escrow_company = Object.assign(this.state.escrow_company, { "state": val });
    this.setState({ escrow_company })
  }
 
  handleProperty = (e) => {
    let { name, value, checked } = e.target;
    this.setState({ [name]: value })
    this.setState({ [name]: checked })
    const seller_type = Object.assign(this.state.seller_type, { "id": 1, party_type: e.target.name });
    console.log("seller_type", seller_type);

  }
  handlemailSelect = (e) => {
    let mailing_address = this.state.errors.mailing_address;
    console.log("mailing_address>>> errr", mailing_address);
    let { name, value, checked } = e.target;
    console.log("dsdsdsd", name, checked);
    if (this.setState({ [name]: checked })) {
      this.setState({ mailing_address: {} })
    }
    console.log("this.state....>>>>", this.state.mailing_addressChecked);
  }
  handlemarriedcouple = (e) => {

    const married_couple = Object.assign(this.state.married_couple, { [e.target.name]: e.target.value });
    this.setState({ married_couple })

  }
  handlecorporation = (e) => {
    console.log("corpo", e.target.value, e.target.name);
    const corportion_details = Object.assign(this.state.corportion_details, { [e.target.name]: e.target.value });
    this.setState({ corportion_details })

  }

  handlemailingaddress = (e) => {
    console.log("mailing_address", e.target.value, e.target.name);
    const mailing_address = Object.assign(this.state.mailing_address, { [e.target.name]: e.target.value });
    this.setState({ mailing_address })
  }
  handletitleCompany = (e) => {
    let { name, value, checked } = e.target;
    console.log("title_company", e.target.value, e.target.name);
    const title_company = Object.assign(this.state.title_company, { [e.target.name]: e.target.value });
    this.setState({title_company});


  }
  handleChange = (e) => {
    console.log();
    let { name, value, checked } = e.target;
    console.log("titlw comapnay ",this.state.title_company);
    this.setState({ [name]: value })
    this.setState({ [name]: checked })
    if(!this.state.escrow_companyCheck || this.state.escrow_companyCheck && this.state.escrow_companyChecked)
    {
      this.setState({ escrow_company: {} })
    }else if (this.state.escrow_companyChecked || !this.state.escrow_companyChecked) {
      this.setState({ escrow_company: this.state.title_company })
    }
  }
  handleescrowCompany = (e) => {
    let { name, value, checked } = e.target;
    // this.setState({ [name]: value })
    // this.setState({ [name]: checked })
    const escrow_company = Object.assign(this.state.escrow_company, { [e.target.name]: e.target.value });
    this.setState({escrow_company})
    
  }
  handlegroupDetails = (e) => {
    console.log("group_details", e.target.value, e.target.name);
    const group_details = Object.assign(this.state.group_details, { [e.target.name]: e.target.value });
    this.setState({ group_details })
  }
  handlegroupPerson3 = (e) => {
    console.log("group_person3", e.target.value, e.target.name);
    const group_person3 = Object.assign(this.state.group_person3, { [e.target.name]: e.target.value });
    this.setState({ group_person3 })

  }
  handlemorePerson = (e) => {
    this.setState({ addPerson: { [e.target.name]: true } })
  }
  submitValidations(event) {
    const { mailing_addressChecked, seller_type, group_person3, married_couple, corportion_details, mailing_address, title_company, escrow_company, group_details, errors } = this.state;

    console.log("checking the owner of property>", this.state.single);
    console.log("mailing_addressChecked", mailing_addressChecked);
    this.state.seller_type.party_type == 'group'
    const self = this;
    this.setState({ formsubmit: true });

    if (event.group_person3 && this.state.addPerson == true) {
      if (validator.isEmpty(event.group_person3.first_name)) {
        errors.group_person3.first_name = 'Please enter a firstName';
        group_person3.first_name = ""
      }
      else {
        delete errors.group_person3.first_name;
      }
      if (validator.isEmpty(event.group_person3.last_name)) {
        errors.group_person3.last_name = 'Please enter a lastName';
        group_person3.last_name = ""
      }
      else {
        delete errors.group_person3.last_name;
      }
      if (!(validator.isEmail(event.group_person3.email))) {
        errors.group_person3.email = 'Please Enter the valid Email ';
        group_person3.email = ""
      }
      else {
        delete errors.group_person3.email;
      }
      if (!validator.isNumeric(event.group_person3.phone_number)) {
        errors.group_person3.phone_number = 'Please enter valid phno';
        group_person3.phone_number = ""
      }
      else {
        delete errors.group_person3.phone_number;
      }

    }

    if (event.group_details && seller_type.party_type == 'group') {
      if (validator.isEmpty(event.group_details.first_name)) {
        errors.group_details.first_name = 'Please enter a firstName';
        group_details.first_name = ""
      }
      else {
        delete errors.group_details.first_name;
      }

      if (validator.isEmpty(event.group_details.last_name)) {
        errors.group_details.last_name = 'Please enter a lastName';
        group_details.last_name = ""
      }
      else {
        delete errors.group_details.last_name;
      }
      if (!(validator.isEmail(event.group_details.email))) {
        errors.group_details.email = 'Please Enter the valid Email ';
        group_details.email = ""
      }
      else {
        delete errors.group_details.email;
      }
      if (!validator.isNumeric(event.group_details.phone_number)) {
        errors.group_details.phone_number = 'Please enter valid phno';
        group_details.phone_number = ""
      }
      else {
        delete errors.group_details.phone_number;
      }

    }

    if (event.married_couple && seller_type.party_type == 'married') {
      if (validator.isEmpty(event.married_couple.first_name)) {
        errors.married_couple.first_name = 'Please enter a firstName';
        married_couple.first_name = ""
      }
      else {
        delete errors.married_couple.first_name;
      }
      if (validator.isEmpty(event.married_couple.last_name)) {
        errors.married_couple.last_name = 'Please enter a lastName';
        married_couple.last_name = ""
      }
      else {
        delete errors.married_couple.last_name;
      }
      if (!(validator.isEmail(event.married_couple.email))) {
        errors.married_couple.email = 'Please Enter the valid Email ';
        married_couple.email = ""
      }
      else {
        delete errors.married_couple.email;
      }
      if (!validator.isNumeric(event.married_couple.phone_number)) {
        errors.married_couple.phone_number = 'Please enter valid phno';
        married_couple.phone_number = ""
      }
      else {
        delete errors.married_couple.phone_number;
      }

    }
    if (event.corportion_details && seller_type.party_type == 'corporation') {
      if (validator.isEmpty(event.corportion_details.first_name)) {
        errors.corportion_details.legalEntityName = 'Please enter a legal Entity Name';
        corportion_details.first_name = ""
      }
      else {
        delete errors.corportion_details.first_name;
      }
      if (validator.isEmpty(event.corportion_details.middle_name)) {
        errors.corportion_details.authorisedsignerName = 'Please enter a authorised signerName';
        corportion_details.middle_name = ""
      }
      else {
        delete errors.corportion_details.middle_name;
      }
      if (validator.isEmpty(event.corportion_details.last_name)) {
        errors.corportion_details.authorisedsignerdesignation = 'Please enter a authorised signature destination';
        corportion_details.last_name = ""
      } else {
        delete errors.corportion_details.last_name;
      }
      if (!validator.isNumeric(event.corportion_details.phone_number)) {
        errors.corportion_details.phone_number = 'Please enter a phone number';
        corportion_details.phone_number = ""
      } else {
        delete errors.corportion_details.phone_number;
      }
      if (!(validator.isEmail(event.corportion_details.email))) {
        errors.corportion_details.email = 'Please enter a email';
        corportion_details.email = ""
      } else {
        delete errors.corportion_details.email;
      }
    }

    if (!mailing_addressChecked) {
      //address validation 

      if (validator.isEmpty(event.mailing_address.street_address)) {
        errors.mailing_address.street_address = 'Please enter an street address';
      } else {
        delete errors.mailing_address.street_address;

      }
      //city validation      
      if (!validator.isAlpha(event.mailing_address.city)) {
        errors.mailing_address.city = 'Please enter a city';
        mailing_address.city = ''
      }

      else if (validator.isEmpty(event.mailing_address.city)) {
        errors.mailing_address.city = 'Please enter a city';
        mailing_address.city = ''
      } else {
        delete errors.mailing_address.city;
      }

      //state validation
      if (event.mailing_address.state == '') {
        errors.mailing_address.state = 'Please select a state';
        // if (validator.isEmpty(event.address.state)) {
        //   errors.state = 'Please select a state';
        // }
      }
      else {
        delete errors.mailing_address.state;

      }
      if (!validator.isNumeric(event.mailing_address.zipcode) && !event.mailing_address.zipcode.length == 5) {
        errors.mailing_address.zipcode = "Please Enter the zipcode";
        mailing_address.zipcode = '';
      }

      else if (validator.isEmpty(event.mailing_address.zipcode)) {
        errors.mailing_address.zipcode = 'Please enter a Zipcode';
        mailing_address.zipcode = '';
      }

      else {
        delete errors.mailing_address.zipcode;
      }
    }
    else {
      errors.mailing_address = {};
    }

    if (event.title_company && !this.state.title_companyChecked) {
      //address validation 
      if (validator.isEmpty(event.title_company.street_address)) {
        errors.title_company.street_address = 'Please enter an address';
      }
      else {
        delete errors.title_company.street_address;

      }
      //city validation      

      if (!validator.isAlpha(event.title_company.city)) {
        errors.title_company.city = 'Please enter a city';
        title_company.city = ''
      }
      else if (validator.isEmpty(event.title_company.city)) {
        errors.title_company.city = 'Please enter a city';
        title_company.city = ''
      }
      else {
        delete errors.title_company.city;
      }
      //state validation
      if (event.title_company.state == '') {
        errors.title_company.state = 'Please select a state';
      }
      else {
        delete errors.title_company.state;
      }
      //zipcode validation

      if (!validator.isNumeric(event.title_company.zipcode)) {
        errors.title_company.zipcode = 'Invalid Zipcode';
        title_company.zipcode = '';
      }
      if (!(event.title_company.zipcode.length == 5)) {
        errors.title_company.zipcode = 'Invalid Zipcode';
        title_company.zipcode = '';
      }
      else if (validator.isEmpty(event.title_company.zipcode)) {
        errors.title_company.zipcode = 'Please enter a Zipcode';
        title_company.zipcode = '';
      }
      else {
        delete errors.title_company.zipcode;
      }
      if (!validator.isNumeric(event.title_company.phone_number)) {
        errors.title_company.phone_number = 'Please enter a phone number';
        title_company.phone_number = '';
      }
      else {
        delete errors.title_company.phone_number;
      }

      if (validator.isEmpty(event.title_company.company_name)) {
        errors.title_company.company_name = 'Please enter a company name';
        title_company.company_name = '';
      }
      else {
        delete errors.title_company.company_name;
      }

      if (!validator.isEmail(event.title_company.email)) {
        errors.title_company.email = 'Please enter a email';
        title_company.email = '';
      }
      else {
        delete errors.title_company.email;
      }

    } else {
      errors.title_company = {}
    }


    if (this.state.escrow_companyCheck || !this.state.escrow_companyChecked) {
      //address validation 
      if (validator.isEmpty(event.escrow_company.street_address)) {
        errors.escrow_company.street_address = 'Please enter an address';
      }
      else {
        delete errors.escrow_company.street_address;
      }
      //city validation      
      if (!validator.isAlpha(event.escrow_company.city)) {
        errors.escrow_company.city = 'Please enter a city';
        escrow_company.city = ''
      }
      else if (validator.isEmpty(event.escrow_company.city)) {
        errors.escrow_company.city = 'Please enter a city';
        escrow_company.city = ''
      }
      else {
        delete errors.escrow_company.city;
      }

      //state validation
      if (event.escrow_company.state == '') {
        errors.escrow_company.state = 'Please select a state';
      }
      else {
        delete errors.escrow_company.state;
      }

      //zipcode validation
      if (!validator.isNumeric(event.escrow_company.zipcode)) {
        errors.escrow_company.zipcode = 'Invalid Zipcode';
        escrow_company.zipcode = '';
      }
      if (!(event.escrow_company.zipcode.length == 5)) {
        errors.escrow_company.zipcode = 'Invalid Zipcode';
        escrow_company.zipcode = '';
      }
      else if (validator.isEmpty(event.escrow_company.zipcode)) {
        errors.escrow_company.zipcode = 'Please enter a Zipcode';
        escrow_company.zipcode = '';
      }
      else {
        delete errors.escrow_company.zipcode;
      }

      if (!validator.isNumeric(event.escrow_company.phone_number)) {
        errors.escrow_company.phone_number = 'Please enter a phone number';
        escrow_company.phone_number = '';
      }
      else {
        delete errors.escrow_company.phone_number;
      }
      if (validator.isEmpty(event.escrow_company.company_name)) {
        errors.escrow_company.company_name = 'Please enter a company name';
        escrow_company.company_name = '';
      }
      else {
        delete errors.escrow_company.company_name;
      }
      if (!validator.isEmail(event.escrow_company.email)) {
        errors.escrow_company.email = 'Please enter a email';
        escrow_company.email = '';
      }
      else {
        delete errors.escrow_company.email;
      }

    } else {
      this.state.errors.escrow_company = {}
    }


    self.setState({ errors: errors });
    return errors;
  }
  secondStepCompleted = () => {

    var excluded_item_desc = JSON.parse(sessionStorage.getItem("names"));
    let sessionInfo = JSON.parse(localStorage.getItem('ecrypt_data'));
    const sessionDetails = {
      first_name: sessionInfo.first_name,
      last_name: sessionInfo.last_name,
      phone_number: sessionInfo.phone_number,
      email: sessionInfo.username,

    }
    console.log("updateded details", this.state)
    const { num_of_acres, mailing_addressChecked, married_couple, mailing_address, escrow_company, title_company, seller_type, seller_details, corportion_details } = this.state;
    let self = this;
    switch (this.state.seller_type.party_type) {
      case 'single':
        self.state.seller_details.push(sessionDetails);
        break;
      case 'married':
        self.state.seller_details.push(married_couple, sessionDetails)
        break;
      case 'corporation':
        self.state.seller_details.push(self.state.corportion_details)
        break;
      case 'group':
        if (this.state.addPerson == true) {
          self.state.seller_details.push(self.state.group_details)
          self.state.seller_details.push(sessionDetails)
          self.state.seller_details.push(this.state.group_person3)

        } else {
          self.state.seller_details.push(self.state.group_details, sessionDetails)
        }
        break;

      default:
        break;
    }



    if (mailing_addressChecked) {

      let mailing_address = this.state.mailing_address;
      mailing_address.street_address = this.state.mailing_address2.street_address;
      mailing_address.apt = this.state.mailing_address2.apt;
      mailing_address.city = this.state.mailing_address2.city;
      mailing_address.state = this.state.mailing_address2.state;
      mailing_address.zipcode = this.state.mailing_address2.zipcode;

      this.setState({ mailing_address });
      console.log("mail>>>", this.state.mailing_address)
    }
    const { address,
      property_type,
      property_images,
      property_inclusions,
      property_attributes,
      num_of_bedrooms,
      num_of_bathrooms,
      square_footage,
      list_price,
      pre_approved_only
      } = this.props.propsdata;


    let errorResponse = this.submitValidations(this.state);
    let married_err = this.isEmpty(errorResponse.married_couple);
    let corportion_err = this.isEmpty(errorResponse.corportion_details);
    let escrow_err = this.isEmpty(errorResponse.escrow_company);
    let group_err = this.isEmpty(errorResponse.group_details);
    let person3_err = this.isEmpty(errorResponse.group_person3);
    let mailing_err = this.isEmpty(errorResponse.mailing_address);
    let title_err = this.isEmpty(errorResponse.title_company);

    console.log("errorResponse", this.isEmpty(errorResponse.married_couple));
    if (married_err && corportion_err && escrow_err && group_err && person3_err && mailing_err && title_err) {

      if (this.state.single || this.state.married || this.state.corporation || this.state.group) {
        let form_totaldetails = {
          address,
          mailing_address: this.state.mailing_address || null,
          property_type:
          {
            "id": 1,
            "p_type": "House"
          },
          property_images,
          property_inclusions: this.props.propsdata.property_inclusions || [],
          excluded_item_desc: excluded_item_desc || [],
          property_attributes: this.props.propsdata.property_attributes || null,
          num_of_bedrooms: this.props.propsdata.num_of_bedrooms || null,
          num_of_bathrooms: this.props.propsdata.num_of_bathrooms || null,
          square_footage: this.props.propsdata.square_footage || null,
          num_of_acres: this.props.propsdata.num_of_acres || null,
          seller_details,
          list_price,
          seller_type,
          pre_approved_only,
          // corportion_details: corportion_details && corportion_details.length ? corportion_details :null ,
          escrow_company: this.state.escrow_company || null,
          title_company: this.state.title_company || null,
          title_hs_select: this.state.title_companyChecked,
          escrow_hs_select: this.state.escrow_companyCheck
        }
        property_attributes.length == 0 && delete form_totaldetails['property_attributes'];
        property_inclusions.length == 0 && delete form_totaldetails['property_inclusions'];
        excluded_item_desc.length == 0 && delete form_totaldetails['excluded_item_desc'];
        // seller_details && !seller_details.length && delete form_totaldetails['seller_details'];
        // form_totaldetails.escrow_company == null ? delete form_totaldetails.escrow_company : form_totaldetails.escrow_company
        mailing_address.street_address === '' && delete form_totaldetails.mailing_address,
          title_company.company_name === '' && delete form_totaldetails.title_company,
          escrow_company.company_name === "" && delete form_totaldetails.escrow_company

        // corportion_details === null && delete form_totaldetails.corportion_details

        let postData = API.property('property/', form_totaldetails);
        postData.then(data => {
          if (data.status === 201) {
            return data.json();
          }
          return data.json();
        }).then(responseData => {


          this.props.currentStep('step3', responseData)
        })
      } else {
        notify.show('Please select owner of the property', 'error');
      }

    } else {
      // console.log("all form errors", this.state.errors);
    }




  }

  render() {
console.log(this.state.escrow_companyCheck,this.state.escrow_companyChecked,this.state.title_companyChecked)
    const { group_person3, married_couple, corportion_details, errors, mailing_address, group_details, title_company, escrow_company, formsubmit } = this.state;

    let listItems = this.state.stateList.map((link) =>
      <li name='state' key={link.state} onClick={() => this.selectProvince(link.state)}>{link.state}</li>
    );
    let listItems1 = this.state.stateList.map((link) =>
      <li name='state' key={link.state} onClick={() => this.selectProvince1(link.state)}>{link.state}</li>
    );
    let listItems2 = this.state.stateList.map((link) =>
      <li name='state' key={link.state} onClick={() => this.selectProvince2(link.state)}>{link.state}</li>
    );
    console.log("this.props", this.props.propsdata);
    const { address } = this.props.propsdata;
    let sessionInfo = JSON.parse(localStorage.getItem('ecrypt_data'));

    return (

      <div>
        <section className="container-fluid custom_property_bg" id="addproperty2">
          <div className="container">
            <Notifications />
            <div className="row">
              <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 col-12 center-align">
                <div className="d-flex flex-column">
                  <p className="property_type respons_padL15">Owner of Property</p>
                  <label className="custom_checkbox margBT0">
                    Single Person
                      <input type="radio" name="single" value='single' checked={this.state.seller_type.party_type == 'single'} onChange={e => this.handleProperty(e)} />
                    <span className="checkmark" />
                  </label>
                  {this.state.seller_type.party_type == 'single' &&
                    <div className="person_detail_form d-flex flex-column margBt10">
                      <p className="person_addporp margBt10 respons_padL15">Person1</p>
                      <div className="d-flex flex-row">
                        <div>
                          <label>First Name</label>
                          <input type="text" className="width270" name="first_name" value={this.state.single ? sessionInfo.first_name : ""} readOnly />
                        </div>
                        <div>
                          <label>Middle Name</label>
                          <input type="text" className="width270" name="middle_name" value={this.state.single ? this.state.middle_name : ""} readOnly />
                        </div>
                        <div>
                          <label>Last Name</label>
                          <input type="text" className="width270 mr-0" name="last_name" value={this.state.single ? sessionInfo.last_name : ""} readOnly />
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div>
                          <label>Phone Number</label>
                          <input type="text" className="width270" name="phone_number" value={this.state.single ? sessionInfo.phone_number : ""} readOnly />
                        </div>
                        <div>
                          <label>Email Address</label>
                          <input type="text" className="width270" name="email" value={this.state.single ? sessionInfo.username : ""} readOnly />
                        </div>
                      </div>
                    </div>
                  }
                  <label className="custom_checkbox margBT0">
                    Married Couple
                      <input type="radio" name="married" value='married' checked={this.state.seller_type.party_type == 'married'} onChange={e => this.handleProperty(e)} />
                    <span className="checkmark" />
                  </label>
                  {this.state.seller_type.party_type == 'married' &&
                    <div>
                      <div className="person_detail_form d-flex flex-column margBt10">
                        <p className="person_addporp margBt10 respons_padL15">Person1</p>
                        <div className="d-flex flex-row">
                          <div>
                            <label>First Name</label>
                            <input type="text" className="width270" name="first_name" value={this.state.married ? sessionInfo.first_name : ""} readOnly />
                          </div>
                          <div>
                            <label>Middle Name</label>
                            <input type="text" className="width270" name="middle_name" value={this.state.married ? sessionInfo.middle_name : ""} readOnly />
                          </div>
                          <div>
                            <label>Last Name</label>
                            <input type="text" className="width270 mr-0" name="last_name" value={this.state.married ? sessionInfo.last_name : ""} readOnly />
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div>
                            <label>Phone Number</label>
                            <input type="text" className="width270" name="phone_number" value={this.state.married ? sessionInfo.phone_number : ""} readOnly />
                          </div>
                          <div>
                            <label>Email Address</label>
                            <input type="text" className="width270" name="email" value={this.state.married ? sessionInfo.username : ""} readOnly />
                          </div>
                        </div>
                      </div>
                      <div className="person_detail_form d-flex flex-column margBt10">
                        <p className="person_addporp margBt10 respons_padL15">Person2</p>
                        <div className="d-flex flex-row">
                          <div>
                            <label>First Name</label>
                            <input type="text" className="width270" name="first_name" value={this.state.married_couple.first_name} onChange={e => this.handlemarriedcouple(e)} />
                            {formsubmit && !married_couple.first_name &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.married_couple.first_name}</label>
                            }

                          </div>
                          <div>
                            <label>Middle Name</label>
                            <input type="text" className="width270" name="middle_name" value={this.state.married_couple.middle_name} onChange={e => this.handlemarriedcouple(e)} />

                          </div>
                          <div>
                            <label>Last Name</label>
                            <input type="text" className="width270 mr-0" name="last_name" value={this.state.married_couple.last_name} onChange={e => this.handlemarriedcouple(e)} />
                            {formsubmit && !married_couple.last_name &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.married_couple.last_name}</label>
                            }
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div>
                            <label>Phone Number</label>
                            <input type="text" className="width270" name="phone_number" value={this.state.married_couple.phone_number} onChange={e => this.handlemarriedcouple(e)} />
                            {formsubmit && !married_couple.phone_number &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.married_couple.phone_number}</label>
                            }
                          </div>
                          <div>
                            <label>Email Address</label>
                            <input type="text" className="width270" name="email" value={this.state.married_couple.email} onChange={e => this.handlemarriedcouple(e)} />
                            {formsubmit && !married_couple.email &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.married_couple.email}</label>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  <label className="custom_checkbox margBT0">
                    Corporation, LLC or other
                      <input type="radio" name="corporation" value='corporation' checked={this.state.seller_type.party_type == 'corporation'} onChange={e => this.handleProperty(e)} />
                    <span className="checkmark" />
                  </label>
                  {this.state.seller_type.party_type == 'corporation' &&
                    <div className="person_detail_form d-flex flex-column margBt10">
                      <p className="person_addporp margBt10 respons_padL15"></p>
                      <div className="d-flex flex-row">
                        <div>
                          <label>Legal Entity Name</label>
                          <input type="text" className="width270" name="first_name" value={this.state.corportion_details.first_name} onChange={e => this.handlecorporation(e)} />
                          {formsubmit && !corportion_details.first_name &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.corportion_details.first_name}</label>
                          }
                        </div>
                        <div>
                          <label>Authorised signer's Name</label>
                          <input type="text" className="width270" name="middle_name" value={this.state.corportion_details.middle_name} onChange={e => this.handlecorporation(e)} />
                          {formsubmit && !corportion_details.middle_name &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.corportion_details.middle_name}</label>
                          }
                        </div>
                        <div>
                          <label>Authorised signer's designation/title</label>
                          <input type="text" className="width270 mr-0" name="last_name" value={this.state.corportion_details.last_name} onChange={e => this.handlecorporation(e)} />
                          {formsubmit && !corportion_details.last_name &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.corportion_details.last_name}</label>
                          }
                        </div>
                      </div>
                      <div className="d-flex flex-row">
                        <div>
                          <label>Phone Number</label>
                          <input type="text" className="width270" name="phone_number" value={this.state.corportion_details.phone_number} onChange={e => this.handlecorporation(e)} />
                          {formsubmit && !corportion_details.phone_number &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.corportion_details.phone_number}</label>
                          }
                        </div>
                        <div>
                          <label>Email Address</label>
                          <input type="text" className="width270" name="email" value={this.state.corportion_details.email} onChange={e => this.handlecorporation(e)} />
                          {formsubmit && !corportion_details.email &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.corportion_details.email}</label>
                          }
                        </div>
                      </div>
                    </div>
                  }
                  <label className="custom_checkbox mb-0">
                    Group of Individuals
                      <input type="radio" name="group" value='group' checked={this.state.seller_type.party_type == 'group'} onChange={e => this.handleProperty(e)} />
                    <span className="checkmark" />
                  </label>
                  {this.state.seller_type.party_type == 'group' &&
                    <div>
                      <div className="person_detail_form d-flex flex-column margBt10">
                        <p className="person_addporp margBt10 respons_padL15">Person1</p>
                        <div className="d-flex flex-row">
                          <div>
                            <label>First Name</label>
                            <input type="text" className="width270" name="first_name" value={this.state.group ? sessionInfo.first_name : ""} />
                          </div>
                          <div>
                            <label>Middle Name</label>
                            <input type="text" className="width270" name="middle_name" />
                          </div>
                          <div>
                            <label>Last Name</label>
                            <input type="text" className="width270 mr-0" name="last_name" value={this.state.group ? sessionInfo.last_name : ""} />
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div>
                            <label>Phone Number</label>
                            <input type="text" className="width270" name="phone_number" value={this.state.group ? sessionInfo.phone_number : ""} />
                          </div>
                          <div>
                            <label>Email Address</label>
                            <input type="text" className="width270" name="email" value={this.state.group ? sessionInfo.username : ""} />
                          </div>
                        </div>
                      </div>
                      <div className="person_detail_form d-flex flex-column margBt10">
                        <p className="person_addporp margBt10 respons_padL15">Person 2</p>
                        <div className="d-flex flex-row">
                          <div>
                            <label>First Name</label>
                            <input type="text" className="width270" name="first_name" value={this.state.group_details.first_name} onChange={e => this.handlegroupDetails(e)} />
                            {formsubmit && !group_details.first_name &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.group_details.first_name}</label>
                            }
                          </div>
                          <div>
                            <label>Middle Name</label>
                            <input type="text" className="width270" name="middle_name" value={this.state.group_details.middle_name} onChange={e => this.handlegroupDetails(e)} />

                          </div>
                          <div>
                            <label>Last Name</label>
                            <input type="text" className="width270 mr-0" name="last_name" value={this.state.group_details.last_name} onChange={e => this.handlegroupDetails(e)} />
                            {formsubmit && !group_details.last_name &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.group_details.last_name}</label>
                            }
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div>
                            <label>Phone Number</label>
                            <input type="text" className="width270" name="phone_number" value={this.state.group_details.phone_number} onChange={e => this.handlegroupDetails(e)} />
                            {formsubmit && !group_details.phone_number &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.group_details.phone_number}</label>
                            }
                          </div>
                          <div>
                            <label>Email Address</label>
                            <input type="text" className="width270" name="email" value={this.state.group_details.email} onChange={e => this.handlegroupDetails(e)} />
                            {formsubmit && !group_details.email &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.group_details.email}</label>
                            }
                          </div>
                        </div>
                      </div>
                      {<button name="addPerson" value={this.state.addPerson} onClick={e => this.handlemorePerson(e)} >ADD One More Person</button>}

                      {!this.state.addPerson ? "" :
                        <div className="person_detail_form d-flex flex-column margBt10">
                          <p className="person_addporp margBt10 respons_padL15">Person 3</p>
                          <div className="d-flex flex-row">
                            <div>
                              <label>First Name</label>
                              <input type="text" className="width270" name="first_name" value={this.state.group_person3.first_name} onChange={e => this.handlegroupPerson3(e)} />
                              {formsubmit && !group_person3.first_name &&
                                <label className="errormessage" style={{ color: 'red' }}>{errors.group_person3.first_name}</label>
                              }
                            </div>
                            <div>
                              <label>Middle Name</label>
                              <input type="text" className="width270" name="middle_name" value={this.state.group_person3.middle_name} onChange={e => this.handlegroupPerson3(e)} />
                            </div>
                            <div>
                              <label>Last Name</label>
                              <input type="text" className="width270 mr-0" name="last_name" value={this.state.group_person3.last_name} onChange={e => this.handlegroupPerson3(e)} />
                              {formsubmit && !group_person3.last_name &&
                                <label className="errormessage" style={{ color: 'red' }}>{errors.group_person3.last_name}</label>
                              }
                            </div>
                          </div>
                          <div className="d-flex flex-row">
                            <div>
                              <label>Phone Number</label>
                              <input type="text" className="width270" name="phone_number" value={this.state.group_person3.phone_number} onChange={e => this.handlegroupPerson3(e)} />
                              {formsubmit && !group_person3.phone_number &&
                                <label className="errormessage" style={{ color: 'red' }}>{errors.group_person3.phone_number}</label>
                              }
                            </div>
                            <div>
                              <label>Email Address</label>
                              <input type="text" className="width270" name="email" value={this.state.group_person3.email} onChange={e => this.handlegroupPerson3(e)} />
                              {formsubmit && !group_person3.email &&
                                <label className="errormessage" style={{ color: 'red' }}>{errors.group_person3.email}</label>
                              }
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
                {formsubmit && (!(this.state.single || this.state.married || this.state.corporation || this.state.group)) &&
                  <label className="errormessage" style={{ color: 'red' }}>Please select owner of property</label>
                }
                <div className="individual_adress">
                  <p className="property_type respons_padL15">Mailing Address</p>
                  <p className="italic_text">Please indicate your mailing address</p>
                  <label className="custom_checkbox margBT0">
                    My mailing address is the same address as the property being sold.
                      <input type="checkbox" name="mailing_addressChecked" value='mailing_addressChecked' onChange={e => this.handlemailSelect(e)} />
                    <span className="checkmark" />
                  </label>

                  <div className="property_address">
                    <label>Street Address</label>
                    <input type="text" className="width370" name="street_address" value={this.state.mailing_addressChecked ? address.street_address : this.state.mailing_address.street_address} onChange={e => this.handlemailingaddress(e)} />
                    {formsubmit && !mailing_address.street_address && !this.state.mailing_addressChecked &&
                      <label className="errormessage" style={{ color: 'red' }}>{errors.mailing_address.street_address}</label>
                    }
                    <label>Apt / Unit</label>
                    <input type="text" className="width170" name="apt" value={this.state.mailing_addressChecked ? address.apt : this.state.mailing_address.apt} onChange={e => this.handlemailingaddress(e)} />

                    <div className="d-flex">
                      <div className="flex-column margR10">
                        <label>City</label>
                        <input type="text" className="width170" name="city" value={this.state.mailing_addressChecked ? address.city : this.state.mailing_address.city} onChange={e => this.handlemailingaddress(e)} />
                        {formsubmit && !mailing_address.city && !this.state.mailing_addressChecked &&
                          <label className="errormessage" style={{ color: 'red' }}>{errors.mailing_address.city}</label>
                        }
                      </div>
                      {this.state.mailing_addressChecked ?


                        <div className="flex-column margR10">
                          <label>State</label>
                          <a className="custom_dropdown d-flex pos_relative" href="javascript:;" >{address.state}</a>
                          {
                            this.state.openDropDown &&
                            <ul className="width70">
                              <li value={address.state}>{address.state}</li>
                            </ul>
                          }
                          {formsubmit && !mailing_address.state && !this.state.mailing_addressChecked &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.mailing_address.state}</label>
                          }
                        </div>
                        :
                        <div className="flex-column margR10">
                          <label>State</label>
                          <a className="custom_dropdown d-flex pos_relative" href="javascript:;" onClick={() => this.setState({ openDropDown: !this.state.openDropDown })}>{this.state.provinceName}<i className={!this.state.openDropDown ? 'arrow down' : 'arrow up'}></i></a>
                          {
                            this.state.openDropDown &&
                            <ul className="width70">
                              {listItems}

                            </ul>
                          }
                          {formsubmit && !mailing_address.state && !this.state.mailing_addressChecked &&
                            <label className="errormessage" style={{ color: 'red' }}>{errors.mailing_address.state}</label>
                          }
                        </div>}
                      <div className="flex-column">
                        <label>Zipcode</label>
                        <input type="text" className="width110" name="zipcode" value={this.state.mailing_addressChecked ? address.zipcode : this.state.mailing_address.zipcode} onChange={e => this.handlemailingaddress(e)} />
                        {formsubmit && !mailing_address.zipcode && !this.state.mailing_addressChecked &&
                          <label className="errormessage" style={{ color: 'red' }}>{errors.mailing_address.zipcode}</label>
                        }
                      </div>
                    </div>
                  </div>

                  <div className="individual_adress">
                    <p className="property_type respons_padL15">Title Company</p>
                    <p className="italic_text">Please indicate the Title Company you would like to use</p>
                    <label className="custom_checkbox margBT0">
                      I would like Handshake to select a Title Company for me.
                      <input type="checkbox" name="title_companyChecked" checked={this.state.title_companyChecked} onChange={e => this.handlemailSelect(e) } />
                      <span className="checkmark" />
                    </label>
                    {this.state.title_companyChecked ? '' :
                      <div className="property_address">
                        <div className="d-flex flex-row">
                          <div className="margR30">
                            <label>Name of Title Company</label>
                            <input type="text" className="width370" name="company_name" value={this.state.title_company.company_name} onChange={e => this.handletitleCompany(e)} />
                            {formsubmit && !title_company.company_name &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.company_name}</label>
                            }
                          </div>
                          <div>
                            <label>Street Address</label>
                            <input type="text" className="width370" name="street_address" value={this.state.title_company.street_address} onChange={e => this.handletitleCompany(e)} />
                            {formsubmit && !title_company.street_address &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.street_address}</label>
                            }
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="margR30">
                            <label>Phone Number of Title Company</label>
                            <input type="text" className="width370" name="phone_number" value={this.state.title_company.phone_number} onChange={e => this.handletitleCompany(e)} />
                            {formsubmit && !title_company.phone_number &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.phone_number}</label>
                            }
                          </div>
                          <div>
                            <label>Apt / Unit</label>
                            <input type="text" className="width170" name="apt" value={this.state.title_company.apt} onChange={e => this.handletitleCompany(e)} />
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="flex-column margR10 margR30">
                            <label>Email Address of Title Company</label>
                            <input type="text" className="width370" name="email" value={this.state.title_company.email} onChange={e => this.handletitleCompany(e)} />
                            {formsubmit && !title_company.email &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.email}</label>
                            }
                          </div>
                          <div className="flex-column margR10">
                            <label>City</label>
                            <input type="text" className="width170" name="city" value={this.state.title_company.city} onChange={e => this.handletitleCompany(e)} />
                            {formsubmit && !title_company.city &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.city}</label>
                            }
                          </div>
                          <div className="flex-column margR10">
                            <label>State</label>


                            <a className="custom_dropdown d-flex pos_relative" href="javascript:;" onClick={() => this.setState({ openDropDown1: !this.state.openDropDown1 })}>{this.state.provinceName1}<i className={!this.state.openDropDown1 ? 'arrow down' : 'arrow up'}></i></a>
                            {
                              this.state.openDropDown1 &&
                              <ul className="width70">
                                {listItems1}

                              </ul>
                            }
                            {formsubmit && !title_company.state &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.state}</label>
                            }
                          </div>
                          <div className="flex-column">
                            <label>Zipcode</label>
                            <input type="text" className="width110" name="zipcode" value={this.state.title_company.zipcode} onChange={e => this.handletitleCompany(e)} />
                            {formsubmit && !title_company.zipcode &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.title_company.zipcode}</label>
                            }
                          </div>
                        </div>
                      </div>
                    }
                  </div>

                  <div className="individual_adress">
                    <p className="property_type respons_padL15">Escrow Company</p>
                    <p className="italic_text">Please indicate the Escrow Company you would like to use</p>
                    <div className="d-flex flex-column">
                      <label className="custom_checkbox margBT0">
                        My Escrow Company is the same as my Title Company.
                        <input type="checkbox" name="escrow_companyChecked" checked={this.state.escrow_companyChecked} disabled={this.state.title_companyChecked || this.state.escrow_companyCheck} onChange={e => this.handleChange(e)} />
                        <span className="checkmark" />
                      </label>
                      <label className="custom_checkbox margBT0">
                        I would like Handshake to select an Escrow Company for me.
                        <input type="checkbox" name="escrow_companyCheck" checked={this.state.escrow_companyCheck} disabled={this.state.escrow_companyChecked} onChange={e => this.handleChange(e)} />
                        <span className="checkmark" />
                      </label>
                    </div>
                    {this.state.escrow_companyCheck ? "" :
                      <div className="property_address">
                        <div className="d-flex flex-row">
                          <div className="margR30">
                            <label>Name of Escrow Company</label>
                            <input type="text" className="width370" name="company_name" value={this.state.escrow_companyChecked ? this.state.title_company.company_name : this.state.escrow_companyCheck ? "" : this.state.escrow_company.company_name} onChange={e => this.handleescrowCompany(e)} />
                            {formsubmit && !escrow_company.company_name && !this.state.escrow_companyChecked &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.company_name}</label>
                            }
                          </div>
                          <div>
                            <label>Street Address</label>
                            <input type="text" className="width370" name="street_address" value={this.state.escrow_companyChecked ? this.state.title_company.street_address : this.state.escrow_company.street_address} onChange={e => this.handleescrowCompany(e)} />
                            {formsubmit && !escrow_company.street_address && !this.state.escrow_companyChecked &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.street_address}</label>
                            }
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="margR30">
                            <label>Phone Number of Escrow Company</label>
                            <input type="text" className="width370" name="phone_number" value={this.state.escrow_companyChecked ? this.state.title_company.phone_number : this.state.escrow_company.phone_number} onChange={e => this.handleescrowCompany(e)} />
                            {formsubmit && !escrow_company.phone_number && !this.state.escrow_companyChecked &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.phone_number}</label>
                            }
                          </div>
                          <div>
                            <label>Apt / Unit</label>
                            <input type="text" className="width170" name="apt" value={this.state.escrow_companyChecked ? this.state.title_company.apt : this.state.escrow_company.apt} onChange={e => this.handleescrowCompany(e)} />

                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="flex-column margR10 margR30">
                            <label>Email Address of Escrow Company</label>
                            <input type="text" className="width370" name="email" value={this.state.escrow_companyChecked ? this.state.title_company.email : this.state.escrow_company.email} onChange={e => this.handleescrowCompany(e)} />
                            {formsubmit && !escrow_company.email && !this.state.escrow_companyChecked &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.email}</label>
                            }
                          </div>
                          <div className="flex-column margR10">
                            <label>City</label>
                            <input type="text" className="width170" name="city" value={this.state.escrow_companyChecked ? this.state.title_company.city : this.state.escrow_company.city} onChange={e => this.handleescrowCompany(e)} />
                            {formsubmit && !escrow_company.city && !this.state.escrow_companyChecked &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.city}</label>
                            }
                          </div>
                          {this.state.escrow_companyChecked ?


                            <div className="flex-column margR10">
                              <label>State</label>
                              <a className="custom_dropdown d-flex pos_relative" href="javascript:;" >{this.state.title_company.state}</a>
                              {
                                this.state.openDropDown &&
                                <ul className="width70">
                                  <li value={this.state.title_company.state}>{this.state.title_company.state}</li>
                                </ul>
                              }
                              {formsubmit && !mailing_address.state && !this.state.escrow_companyChecked &&
                                <label className="errormessage" style={{ color: 'red' }}>{errors.mailing_address.state}</label>
                              }
                            </div> :
                            <div className="flex-column margR10">
                              <label>State</label>

                              <a className="custom_dropdown d-flex pos_relative" href="javascript:;" onClick={() => this.setState({ openDropDown2: !this.state.openDropDown2 })}>{this.state.provinceName2}<i className={!this.state.openDropDown2 ? 'arrow down' : 'arrow up'}></i></a>
                              {
                                this.state.openDropDown2 &&
                                <ul className="width70">
                                  {listItems2}

                                </ul>
                              }
                              {formsubmit && !escrow_company.state &&
                                <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.state}</label>
                              }
                            </div>
                          }
                          <div className="flex-column">
                            <label>Zipcode</label>
                            <input type="text" className="width110" name="zipcode" value={ this.state.escrow_companyChecked ? this.state.title_company.zipcode : this.state.escrow_company.zipcode} onChange={e => this.handleescrowCompany(e)} />
                            {formsubmit && !escrow_company.zipcode && !this.state.escrow_companyChecked &&
                              <label className="errormessage" style={{ color: 'red' }}>{errors.escrow_company.zipcode}</label>
                            }
                          </div>
                        </div>

                      </div>
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
              <div className="col-lg-9 col-md-9 col-sm-12 col-12 custom_property2_footer pr-0">
                <button className="blue_lined_button" onClick={() => this.props.currentStep('step1')}>Back</button>
                <button onClick={() => this.secondStepCompleted()}>Generate H-Code</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPropertyStep2;
