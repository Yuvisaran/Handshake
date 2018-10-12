import React, { Component } from 'react';

class ValidationMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorList: []
    }
  }
  componentWillMount() {
    this.setState({ errorList: this.props.errorList });
  }
  closeValidation = () => this.props.closeValidation(false);
  render() {
    return (
      <div>
        <div className="validation_message">
          <ul className={this.state.errorList.length < 2 ? 'li_1' : null}>
            {
              this.state.errorList.map((data, index) => <li key={index}>{data}</li>)
            }
          </ul>
          <a className="close-ico" onClick={() => this.closeValidation() }>+</a>
        </div>
      </div>
    );
  }
}

export default ValidationMessage;
