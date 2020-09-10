import React from 'react';
import {mapStyles} from '../styles/App';
import {Map, Marker, InfoWindow} from 'google-maps-react';

export default class GoogleMap extends React.Component<any, any> {
  constructor(props) {
      super(props);
  }

  render() {
      return <Map style={mapStyles} zoom={15} 
      // onDragend={this.centerMoved} 
      center={this.state.sampleLocation} initialCenter={this.state.sampleLocation} google={this.props.google}   
      onReady={(mapProps, map) => {
        this.setState({ map: map as google.maps.Map})
      }}>


        {this.state.items.map(hit =>
          <Marker
            key={hit.id}
            // onClick={this.onMarkerClick}
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
}
