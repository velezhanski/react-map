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
  }

  render() {
    return (
      <div>
        <CoordinatesSubmitForm
            onFormSubmitted={this.rerender}
        />

        <GoogleMap
        onRef={ref => (this.googleMap = ref)}
        />
      </div>
    );
  }   
  
  rerender(latitude, longitude) {
    this.googleMap.initiateSearch(latitude,longitude)
  }
}