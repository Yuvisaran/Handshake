import React, { Component } from "react";
import { observer } from "mobx-react";

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">{this.props.children}</div>
      </div>
    );
  }
}

export default observer(App);
