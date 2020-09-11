import React from 'react';
import CoordinatesSubmitForm from "./components/CoordinatesSubmitForm";
import {UpdateMap} from "./api/UpdateMap";
import GoogleMap from "./components/GoogleMap";

export default class App extends React.Component<any, any> {
  updateMap: UpdateMap;
  googleMap: any;
  constructor(props: any) {
    super(props);
    this.rerender = this.rerender.bind(this);
    this.updateMap = new UpdateMap();
    this.googleMap = React.createRef();
  }

  render() {
    return (
      <div>
        <CoordinatesSubmitForm
            onFormSubmitted={this.rerender}
        />

        <GoogleMap
        ref={this.googleMap}
        />
      </div>
    );
  }   
  
  rerender(latitude, longitude) {
    console.log(latitude, longitude)
    this.googleMap.current.initiateSearch(latitude,longitude)
  }
}