"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var App_1 = require("../styles/App");
var google_maps_react_velez_1 = require("google-maps-react-velez");
var GoogleMap = /** @class */ (function (_super) {
    __extends(GoogleMap, _super);
    function GoogleMap(props) {
        return _super.call(this, props) || this;
    }
    GoogleMap.prototype.render = function () {
        var _this = this;
        return react_1["default"].createElement(google_maps_react_velez_1.Map, { style: App_1.mapStyles, zoom: 15, 
            // onDragend={this.centerMoved} 
            center: this.state.sampleLocation, initialCenter: this.state.sampleLocation, google: this.props.google, onReady: function (mapProps, map) {
                _this.setState({ map: map });
            } },
            this.state.items.map(function (hit) {
                var _a, _b;
                return react_1["default"].createElement(google_maps_react_velez_1.Marker, { key: hit.id, 
                    // onClick={this.onMarkerClick}
                    title: (_b = (_a = hit.player) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'No Name', position: { lat: hit.latitude, lng: hit.longitude } });
            }),
            react_1["default"].createElement(google_maps_react_velez_1.InfoWindow, { google: this.props.google, map: this.state.map, marker: this.state.activeMarker, visible: this.state.showingInfoWindow },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h1", null, this.state.selectedPlace.title))));
    };
    return GoogleMap;
}(react_1["default"].Component));
exports["default"] = GoogleMap;
