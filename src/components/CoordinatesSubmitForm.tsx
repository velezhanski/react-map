import React from 'react';
import {ICoordinates} from '../utils/interfaces';

export default class CoordinatesSubmitForm extends React.Component<any, ICoordinates> {
  constructor(props) {
      super(props);
      this.handleFormSubmission = this.handleFormSubmission.bind(this);
      this.handleLatChange = this.handleLatChange.bind(this);
      this.handleLngChange = this.handleLngChange.bind(this);
      this.state = {latitude: 40.7128, longitude: -74.0060};
  }

  render() {
      return <form onSubmit={this.handleFormSubmission}>
                <input 
                type="text" 
                name="latitude" 
                placeholder="Latitude" 
                value={ this.state.latitude}
                onChange={ this.handleLatChange } 
              />
              
              <input 
                type="text" 
                name="longitude" 
                placeholder="Longitude"
                value={ this.state.longitude } 
                onChange={ this.handleLngChange } 
              />
              
              <button value="Send" type="submit">Update</button>
      </form>
  }

  handleLatChange({ target }) {
    this.setState({
      latitude: target.value    
    });
  }

  handleLngChange({ target }) {
    this.setState({
      longitude: target.value    
    });
  }

  handleFormSubmission(event) {
    event.preventDefault();

    if (this.state.latitude === 0 || this.state.longitude === 0) {
      return;
    }

  this.props.onFormSubmitted(this.state.latitude, this.state.longitude)
  }
}
