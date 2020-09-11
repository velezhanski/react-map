import React from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react-velez';
import {mapStyles} from '../styles/App';
import {UpdateMap} from '../api/UpdateMap'
import {offset, initialCords} from '../utils/constants'

class GoogleMap extends React.Component<any, any> {
  updateMap: UpdateMap;
  constructor(props) {
      super(props);
      this.updateMap = new UpdateMap();
      this.centerMoved = this.centerMoved.bind(this);
      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.state = {      
        coordinates: initialCords,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        map: {},
        items: [],
      };
  }

  render() {
      return <Map minZoom={11} style={mapStyles} zoom={14} onDragend={this.centerMoved} center={this.state.coordinates} initialCenter={this.state.coordinates} google={this.props.google}>
  
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
        
  }

  centerMoved(mapProps, map) {
    console.log("triggered")
    var newCords = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
    var oldCords = {lat: this.state.coordinates.lat, lng: this.state.coordinates.lng}

    if ((newCords.lat > oldCords.lat + offset || newCords.lat < oldCords.lat - offset) || (newCords.lng > oldCords.lng + offset || newCords.lng < oldCords.lng - offset )) {
      this.initiateSearch(newCords.lat, newCords.lng);
    }
  }

  async initiateSearch(latitude, longitude) {
    console.log("search started")
    try {
        const data = await this.updateMap.renderNew(latitude, longitude);
          this.setState({
            items: data.map(item => ({
              latitude: item.latitude,
              longitude: item.longitude,
              player: item.player,
              id: item.id
            })),
            coordinates: {lat: latitude, lng: longitude}
          });
    } catch (e) {
        console.error("Couldn't updateMap", e)
    }
  }

  componentDidMount() {
    this.initiateSearch(initialCords.lat, initialCords.lng)
  }

  onMarkerClick = (props: any, marker: any, e: any) =>
    this.setState({selectedPlace: props, activeMarker: marker, showingInfoWindow: true});
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(GoogleMap)

