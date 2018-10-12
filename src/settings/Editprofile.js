import React, { Component } from "react";
import AWS from 'aws-sdk';
import profile_pic from "../assets/images/profile_pic.png";
import API from "../global/API";
const isUserLoggedIn = JSON.parse(localStorage.getItem("ecrypt_data"))
  ? JSON.parse(localStorage.getItem("ecrypt_data"))
  : "";

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_avatar: '',
      AWSData: {},
      file: '',
      imagePreviewUrl: '',
      uId: '',
      uploadingPhoto: false,
      successFlag: false,
      errorFlag: false,
      errorMessage: ''
    }
  }
  componentWillMount() {
    this.setState({ uId: isUserLoggedIn.id, user_avatar: isUserLoggedIn.user_avatar });
  }
  // fetch logged in user detail
  fetchUserDetail = (val) => {
    let getData = API.GET(`user/`);
    getData.then(data => {
      if (data.status === 200) return data.json();
      else {
        this.setState({ errorFlag: true });
        return data.json();
      }
    }).then(responseData => {
      if (!this.state.errorFlag) {
        this.setState({ user_avatar: responseData.results[0].user_avatar });
        if(val) {
          let userData = JSON.parse(localStorage.getItem("ecrypt_data"));
          userData.user_avatar = responseData.results[0].user_avatar;
          localStorage.setItem('ecrypt_data', JSON.stringify(userData));
          window.location.reload();
        }
      }
      else {
        this.setState({ errorMessage: responseData.message })
        setTimeout(() => {
          this.setState({ errorFlag: false });
        }, 5000);
      }
    });
  }
  // On file changed
  newFileChoosen = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file);
  }
  // Remove avatar
  removeAvatar = () => {
    this.setState({
      imagePreviewUrl: '',
      user_avatar: ''
    });
    let profileUrl = { 'user_avatar': '' }
    API.PATCH(`user/${this.state.uId}/`, profileUrl);
    let userData = JSON.parse(localStorage.getItem("ecrypt_data"));
    userData.user_avatar = '';
    localStorage.setItem('ecrypt_data', JSON.stringify(userData));
    window.location.reload();
  }
  // New Profile photo will be updated
  uploadUserProfile = () => {
    const self = this;
    this.setState({ uploadingPhoto: true });
    // fetch aws idwntity from django
    let getAwsData = API.GET(`user/awsidentity/`);
    getAwsData
      .then(response => response.json())
      .then(responseData => {
        this.setState({ AWSData: responseData });
        // post image on s3 bucket
        let AwsParams = { RoleArn: this.state.AWSData.auth_role_arn, WebIdentityToken: this.state.AWSData.Token };
        AWS.config.region = this.state.AWSData.bucket_region;
        AWS.config.credentials = new AWS.WebIdentityCredentials(AwsParams, err => {
          console.log(err, err.stack);
        }
        );
        AWS.config.credentials.get(err => {
          if (err) console.log(err);
        });
        let s3 = new AWS.S3({
          apiVersion: "2006-03-01",
          params: { Bucket: self.state.AWSData.bucket_name }
        });
        let fileName = self.state.file.name;
        let albumName = '';
        let albumPhotosKey = `${encodeURIComponent(albumName)}${self.state.AWSData.IdentityId}/`;
        let photoKey = albumPhotosKey + fileName;
        s3.upload({
          Key: photoKey,
          Body: self.state.file
        },
          function (err, data) {
            if (err) return console.log("There was an error uploading your photo: ", err.message);
            let user_avatar = { 'user_avatar': data.key };
            let postData = API.PATCH(`user/${self.state.uId}/`, user_avatar);
            postData.then(data => {
              if (data.status === 200) {
                self.setState({ successFlag: true });
                return data.json();
              }
              else {
                self.setState({ errorFlag: true });
                return data.json();
              }
            }).then(responseData => {
              if (!self.state.errorFlag) {
                self.fetchUserDetail(true);
                self.setState({ uploadingPhoto: false, imagePreviewUrl: '' });
                setTimeout(() => {
                  self.setState({ successFlag: false });
                }, 5000);
              }
              else {
                self.setState({ errorMessage: responseData.message })
                setTimeout(() => {
                  self.setState({ errorFlag: false });
                }, 5000);
              }
            });
          }
        );
      })
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-sm-12 col-12">
              <div className="personal_info_head">
                <h4>Profile Photo</h4>
              </div>
              <div className="profile_pic_box">
                {
                  this.state.imagePreviewUrl ?
                    <div className="picture_set pos_relative">
                      <img src={this.state.imagePreviewUrl} alt="Profile" />
                      <input 
                        type="file"
                        id="edit_profile_pic_settigs"
                        onChange={(e) => this.newFileChoosen(e)} />
                    </div> :
                    <div className={this.state.user_avatar.length ? "picture_set pos_relative" : "picture_set"}>
                      {
                        this.state.user_avatar.length ?
                          <img src={this.state.user_avatar} alt="Profile" /> :
                          <img src={profile_pic} alt="Profile" />
                      }
                      <input 
                        type="file" 
                        id="edit_profile_pic_settigs"
                        onChange={(e) => this.newFileChoosen(e)} />
                    </div>
                }
                <div className="profile_pic_btn my-auto">
                  <label htmlFor="edit_profile_pic_settigs">Add Photo</label>
                  {
                    this.state.user_avatar.length || this.state.imagePreviewUrl ?
                      <button onClick={() => this.removeAvatar()}>Remove Photo</button> :
                      null
                  }
                </div>
              </div>
              {
                this.state.uploadingPhoto ?
                  <button type="button" className="profile_pic_save">Please wait uploading.</button> :
                  <button disabled={!this.state.imagePreviewUrl} className="profile_pic_save" onClick={() => this.uploadUserProfile()}>Save</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editprofile;
