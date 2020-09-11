import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react-velez';
import {mapStyles} from './styles/App';
import CoordinatesSubmitForm from "./components/CoordinatesSubmitForm";
import {UpdateMap} from "./api/UpdateMap";

class App extends Component<any, any> {
  updateMap: UpdateMap;
  constructor(props: any) {
    super(props);
    this.updateMap = new UpdateMap();
    this.centerMoved = this.centerMoved.bind(this);
    this.initiateSearch = this.initiateSearch.bind(this);

    this.state = {
      sampleLocation: {lat: 49.246292, lng: -123.116226},
      items: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      map: {},
    };
  }

  render() {
    return (
      <div>
        <CoordinatesSubmitForm
            onFormSubmitted={this.initiateSearch}
        />

        <Map minZoom={11} style={mapStyles} zoom={14} onDragend={this.centerMoved} center={this.state.sampleLocation} initialCenter={this.state.sampleLocation} google={this.props.google}   
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

  async initiateSearch(latitude, longitude) {
    try {
        const data = await this.updateMap.renderNew(latitude, longitude);
          this.setState({
            items: data.map(item => ({
              latitude: item.latitude,
              longitude: item.longitude,
              player: item.player,
              id: item.id
            })),
            sampleLocation: {lat: latitude, lng: longitude}
          });
    } catch (e) {
        console.error("Couldn't updateMap", e)
    }
  }

  centerMoved(mapProps, map) {
    var newCords = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
    var oldCords = {lat: this.state.sampleLocation.lat, lng: this.state.sampleLocation.lng}
    var offset = 0.02

    if ((newCords.lat > oldCords.lat + offset || newCords.lat < oldCords.lat - offset) || (newCords.lng > oldCords.lng + offset || newCords.lng < oldCords.lng - offset )) {
      this.initiateSearch(newCords.lat, newCords.lng);
    }
  }

  onMarkerClick = (props: any, marker: any, e: any) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    
  componentDidMount() {
    this.initiateSearch(49.246292, -123.116226)
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(App)