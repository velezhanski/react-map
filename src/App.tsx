import React, { Component } from 'react';
import './App.css';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import axios from 'axios'
import CSS from 'csstype';

const sampleLocation = {lat: 49.246292, lng: -123.116226};

const mapStyles: CSS.Properties = {
  width: '600px',
  height: '500px'
};



class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
 
    this.state = {
      items: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: {}
    };
  }

  onMarkerClick = (props: any, marker: any, e: any) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  componentDidMount() {
   axios.get(`https://stg-services.benchapp.com/v1/free-agents?radius=99&longitude=${sampleLocation.lng}&latitude=${sampleLocation.lat}&sport=HOCKEY`)
      .then(res => {
        this.setState({
          items: res.data.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude,
            player: item.player,
            id: item.id
          }))
        });
      })
      .catch(error => console.log(error));
    }


  render() {
    return (

      
      <Map style={mapStyles} initialCenter={sampleLocation} google={this.props.google}   
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
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(App)