import React, { Component } from 'react';
import API from "../global/API";
import moment from 'moment';

class PersonalInfoSeting extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      userData: {}
    }
  }
  componentWillMount() {
    this.fetchUserDetail();
  }
  // fetch logged in user detail
  fetchUserDetail = () => {
    let getData = API.GET(`user/`);
    getData.then(data => {
      if(data.status === 200) return data.json();
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if(!this.state.errorFlag) {
        if(responseData.results[0]!=="")
        {
          console.log("this.stater. responsedata");
        let userData = responseData.results[0];
        userData.phone_number = userData.phone_number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        this.setState({ userData });
        }
      }
      else {
        this.setState({ errorMessage: responseData.message})
        setTimeout(() => {
          this.setState({ errorFlag: false });
        }, 5000);
      }
    });
  }
  changeEditMode = () => {
    this.props.setTab('personalInfoEdit');
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="personal_info_head">
            <h4>Personal Information</h4>
            <button className="flex-row-reverse" onClick={() => this.changeEditMode()}>Edit</button>
          </div>
          <div className="personal_info_box row">
            <div className="col-lg-5 col-md-5 col-sm-12 col-12 personal_info_responsive_view">
              <p className="personal_info_label">First Name</p>
              <p className="personal_info_data">{this.state.userData.first_name}</p>
            </div>
            <div className="col-lg-7 col-md-7 col-sm-12 col-12 personal_info_responsive_view">
              <p className="personal_info_label">Last Name</p>
              <p className="personal_info_data">{this.state.userData.last_name}</p>
            </div>
          </div>
          <div className="personal_info_box row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 personal_info_responsive_view">
              <p className="personal_info_label">Email Address</p>
              <p className="personal_info_data">{this.state.userData.username}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 text-center personal_info_responsive_view">
              <p className="personal_info_label">Phone Number</p>
              <p className="personal_info_data">{this.state.userData.phone_number}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-12 personal_info_responsive_view">
              <p className="personal_info_label">Birthdate</p>
              <p className="personal_info_data mb-0">{moment(this.state.userData.birth_date).format('MMMM DD, YYYY')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalInfoSeting;
