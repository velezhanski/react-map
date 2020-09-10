import React, { Component } from 'react';
import {ICoordinates} from '../utils';

export default class MessageForm extends React.Component<any, ICoordinates> {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {latitude: 0, longitude: 0};
  }

  render() {
      return <form>
                <input 
                type="text" 
                name="inputLat" 
                placeholder="Latitude" 
                value={ this.state.latitude}
                onChange={ this.handleChange } 
              />
              
              <input 
                type="text" 
                name="inputLng" 
                placeholder="Longitude"
                value={ this.state.longitude } 
                onChange={ this.handleChange } 
              />
              
              <button value="Send" onClick={ this.handleChange }>Update</button>
      </form>
  }

  handleChange({ target }) {
    this.setState({
      latitude: target.value,
      longitude: target.value
    });
  }
}
