import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import axios from 'axios'
import CSS from 'csstype';

const mapStyles: CSS.Properties = {
  marginTop: '2rem'
};

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
 
    this.state = {
      inputLat: null,
      inputLng: null,
      sampleLocation: {lat: 49.246292, lng: -123.116226},
      items: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: {}
    };

    this.publish = this.publish.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  publish() {
    this.initiateSearch(this.state.inputLat, this.state.inputLng);
  }

  onMarkerClick = (props: any, marker: any, e: any) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    
  componentDidMount() {
   axios.get(`https://stg-services.benchapp.com/v1/free-agents?radius=10&longitude=${this.state.sampleLocation.lng}&latitude=${this.state.sampleLocation.lat}&sport=HOCKEY`)
      .then(res => {
        this.setState({
          items: res.data.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude,
            player: item.player,
            id: item.id
          })),
        });
      })
      .catch(error => console.log(error));
  }

  initiateSearch(lat, lng) {
    axios.get(`https://stg-services.benchapp.com/v1/free-agents?radius=10&longitude=${lng}&latitude=${lat}&sport=HOCKEY`)
      .then(res => {
        this.setState({
          items: res.data.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude,
            player: item.player,
            id: item.id
          })),
          sampleLocation: {lat, lng}
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>

      <input 
        type="text" 
        name="inputLat" 
        placeholder="Latitude" 
        value={ this.state.inputLat }
        onChange={ this.handleChange } 
      />
      
      <input 
        type="text" 
        name="inputLng" 
        placeholder="Longitude"
        value={ this.state.inputLng } 
        onChange={ this.handleChange } 
      />
      
      <button value="Send" onClick={ this.publish }>Update</button>

        <Map style={mapStyles} center={this.state.sampleLocation} initialCenter={this.state.sampleLocation} google={this.props.google}   
        onReady={(mapProps, map) => {
          this.setState({ map: map as google.maps.Map})
        }}>
  

          {this.state.items.map(hit =>
            <Marker
              key={hit.id}
              onClick={this.onMarkerClick}
              title={hit.player?.name ?? 'No Name'}
              position={{lat: hit.latitude, lng: hit.longitude}} 
            />
          )}
            
              <InfoWindow
                google={this.props.google}
                map={this.state.map as google.maps.Map}
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h1>{this.state.selectedPlace.title}</h1>
                  </div>
              </InfoWindow>
        </Map>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(App)