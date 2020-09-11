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
var MapData = /** @class */ (function (_super) {
    __extends(MapData, _super);
    function MapData(props) {
        var _this = _super.call(this, props) || this;
        _this.onMarkerClick = function (props, marker, e) {
            return _this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            });
        };
        _this.state = {
            sampleLocation: { lat: 49.246292, lng: -123.116226 },
            map: {},
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
        };
        return _this;
    }
    MapData.prototype.render = function () {
        return;
    };
    return MapData;
}(react_1["default"].Component));
exports["default"] = MapData;
