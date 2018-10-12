import React, { Component } from "react";
import EditpropertyStep1 from "./EditpropertyStep1";
import EditpropertyStep2 from "./EditpropertyStep2";


class Editproperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currStep: 'step1',
      data:''
    }
  }
  propertySteps = () => {    
    switch(this.state.currStep) {
      case 'step1':
        return <EditpropertyStep1 currentStep={this.currentStep} id={this.props.location.state} />
      case 'step2':
        return <EditpropertyStep2 currentStep={this.currentStep} propsdata ={this.state.data}/>
     
      default:
        return <EditpropertyStep1 currentStep={this.currentStep} />
    }
  }
  currentStep =( currStep,prop) => {
    console.log("prop",prop);
    this.setState({ currStep ,data:prop})
  }
  render() {
    return (

 <div>
    {
      this.state.currStep !== 'step3' &&
    <div className="container-fluid bg_gray">
      <div className="container custom_property_header">
        <h4>Edit Property</h4>
        <p>Step { this.state.currStep === 'step1' ? '1'  : '2'} of 2</p>
      </div>
    </div>
    }
    { this.propertySteps() }

 </div>
   );
  }
}

export default Editproperty;
