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
require("./App.css");
var google_maps_react_1 = require("google-maps-react");
var axios_1 = require("axios");
var mapStyles = {
    marginTop: '2rem'
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.onMarkerClick = function (props, marker, e) {
            return _this.setState({
                selectedPlace: props,
                activeMarker: marker,
                showingInfoWindow: true
            });
        };
        _this.state = {
            inputLat: null,
            inputLng: null,
            sampleLocation: { lat: 49.246292, lng: -123.116226 },
            items: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            map: {}
        };
        _this.publish = _this.publish.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.centerMoved = _this.centerMoved.bind(_this);
        return _this;
    }
    App.prototype.handleChange = function (_a) {
        var _b;
        var target = _a.target;
        this.setState((_b = {},
            _b[target.name] = target.value,
            _b));
    };
    App.prototype.publish = function () {
        this.initiateSearch(this.state.inputLat, this.state.inputLng);
    };
    App.prototype.centerMoved = function (mapProps, map) {
        // console.log('args:', mapProps, map);
        console.log(map.getCenter().lat());
        console.log(map.getCenter().lng());
        this.initiateSearch(map.getCenter().lat(), map.getCenter().lng());
    };
    App.prototype.componentDidMount = function () {
        var _this = this;
        axios_1["default"].get("https://stg-services.benchapp.com/v1/free-agents?radius=10000000000&longitude=" + this.state.sampleLocation.lng + "&latitude=" + this.state.sampleLocation.lat + "&sport=HOCKEY")
            .then(function (res) {
            _this.setState({
                items: res.data.map(function (item) { return ({
                    latitude: item.latitude,
                    longitude: item.longitude,
                    player: item.player,
                    id: item.id
                }); })
            });
        })["catch"](function (error) { return console.log(error); });
    };
    App.prototype.initiateSearch = function (lat, lng) {
        var _this = this;
        console.log(lat, lng);
        axios_1["default"].get("https://stg-services.benchapp.com/v1/free-agents?radius=10000000000&longitude=" + lng + "&latitude=" + lat + "&sport=HOCKEY")
            .then(function (res) {
            _this.setState({
                items: res.data.map(function (item) { return ({
                    latitude: item.latitude,
                    longitude: item.longitude,
                    player: item.player,
                    id: item.id
                }); }),
                sampleLocation: { lat: lat, lng: lng }
            });
        })["catch"](function (error) { return console.log(error); });
    };
    App.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("input", { type: "text", name: "inputLat", placeholder: "Latitude", value: this.state.inputLat, onChange: this.handleChange }),
            react_1["default"].createElement("input", { type: "text", name: "inputLng", placeholder: "Longitude", value: this.state.inputLng, onChange: this.handleChange }),
            react_1["default"].createElement("button", { value: "Send", onClick: this.publish }, "Update"),
            react_1["default"].createElement(google_maps_react_1.Map, { style: mapStyles, zoom: 15, onDragend: this.centerMoved, center: this.state.sampleLocation, initialCenter: this.state.sampleLocation, google: this.props.google, onReady: function (mapProps, map) {
                    _this.setState({ map: map });
                } },
                this.state.items.map(function (hit) {
                    var _a, _b;
                    return react_1["default"].createElement(google_maps_react_1.Marker, { key: hit.id, onClick: _this.onMarkerClick, title: (_b = (_a = hit.player) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'No Name', position: { lat: hit.latitude, lng: hit.longitude } });
                }),
                react_1["default"].createElement(google_maps_react_1.InfoWindow, { google: this.props.google, map: this.state.map, marker: this.state.activeMarker, visible: this.state.showingInfoWindow },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h1", null, this.state.selectedPlace.title))))));
    };
    return App;
}(react_1.Component));
exports["default"] = google_maps_react_1.GoogleApiWrapper({
    apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(App);
