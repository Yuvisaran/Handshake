import React, { Component } from "react";
import AddPropertyStep1 from "./AddPropertyStep1";
import AddPropertyStep2 from "./AddPropertyStep2";
import PropertyHcode from "./PropertyHcode";


class Addproperty extends Component {
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
        return <AddPropertyStep1 currentStep={this.currentStep} />
      case 'step2':
        return <AddPropertyStep2 currentStep={this.currentStep} propsdata ={this.state.data}/>
      case 'step3':
        return <PropertyHcode propsdata ={this.state.data} />
      default:
        return <AddPropertyStep1 currentStep={this.currentStep} />
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
        <h4>Add a Property</h4>
        <p>Step { this.state.currStep === 'step1' ? '1'  : '2'} of 2</p>
      </div>
    </div>
    }
    { this.propertySteps() }

 </div>
   );
  }
}

export default Addproperty;
