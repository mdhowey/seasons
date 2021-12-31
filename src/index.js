import React from 'react';
import ReactDOM from 'react-dom';

// 'extends' --> subclassing React.Component for use of lifecycle methods
class App extends React.Component {
  // JS constructor, not specific to React
  // constructor() gets called with props object
  // good place to initialize state
  constructor(props) {
    // reference to parents props
    super(props);

    // initialize state obj with property lat (latitude) and a value of null
    // when state obj is updated, component with almost instantly rerender
    this.state = { lat: null, errorMessage: '' };

    window.navigator.geolocation.getCurrentPosition(
      // takes two function callbacks
      // success callback
      position => {
        // setState() is inherited from React.Component
        console.log(position);
        this.setState({ lat: position.coords.latitude });
        // never directly assign value to state obj once initialized 
        // NEVER DO THIS --> this.state.lat = position.coords.latitude
      },
      // failure callback
      err => {
        // not all state properties have to be updated
        // setState() doesn't add or remove state
        this.setState({ errorMessage: err.message });
      }
    );
  };

  // render() is always needed in React!
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>
    }

    if (!this.state.errorMessage && !this.state.lat) {
      return <div>Loading...</div>
    }
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));  