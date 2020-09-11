import React from 'react';
import CoordinatesSubmitForm from "./components/CoordinatesSubmitForm";
import {UpdateMap} from "./api/UpdateMap";
import GoogleMap from "./components/GoogleMap";

export default class App extends React.Component<any, any> {
  updateMap: UpdateMap;
  googleMap: any;
  constructor(props: any) {
    super(props);
    this.updateMap = new UpdateMap();
    this.googleMap = React.createRef();
  }

  render() {
    return (
      <div>
        <CoordinatesSubmitForm
            onFormSubmitted={this.googleMap.initiateSearch}
        />

        <GoogleMap
        ref={this.googleMap}
        />
      </div>
    );
  }    
}