import React from 'react';
import {Map, Marker, InfoWindow} from 'google-maps-react-velez';
import {mapStyles} from '../styles/App';

export default class GoogleMap extends React.Component<any, any> {
  constructor(props) {
      super(props);
      this.centerMoved = this.centerMoved.bind(this);
      this.onMarkerClick = this.onMarkerClick.bind(this);
      this.state = {      
        sampleLocation: {lat: 49.246292, lng: -123.116226},
        map: {},
      };
  }

  render() {
      return <Map minZoom={11} style={mapStyles} zoom={14} onDragend={this.centerMoved} center={this.state.sampleLocation} initialCenter={this.state.sampleLocation} google={this.props.google}>
  
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

  centerMoved() {
    console.log("Moved")
  }

  onMarkerClick = (props: any, marker: any, e: any) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

}
