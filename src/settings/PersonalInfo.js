import React, { Component } from 'react';
import Editmode from './Editmode.js';
import PersonalInfoSetting from './PersonalInfoSetting.js';

class PersonalInfo extends Component {
  constructor() {
    super();
    this.state = {
      editMode: 'personalInfo',
    }
  }
  setTab = (val) => this.setState({ editMode: val })
  render() {
    return (
      <div>
        {
          this.state.editMode === 'personalInfoEdit' ?
            <Editmode setTab={this.setTab} /> : <PersonalInfoSetting setTab={this.setTab} />
        }
      </div>
    );
  }
}

export default PersonalInfo;
