import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper, onMarkerClick, InfoWindow} from 'google-maps-react';
 
const sampleLocation = {lat: 49.246292, lng: -123.116226};

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      items: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  componentDidMount() {
    fetch(`http://stg-services.benchapp.com/v1/free-agents?radius=1&longitude=${sampleLocation.lng}&latitude=${sampleLocation.lat}&sport=HOCKEY`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          items: data.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude,
            player: item.player
          }))
        });
      })
    }


  render() {
    const { hits } = this.state;
    return (
      <Map initialCenter={sampleLocation} google={this.props.google} zoom={14}>
 
        {this.state.items.map(hit =>
          <Marker
            onClick={this.onMarkerClick}
            name={hit.player.name}
            position={{lat: hit.latitude, lng: hit.longitude}} 
          />
         )}
                 <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(App)