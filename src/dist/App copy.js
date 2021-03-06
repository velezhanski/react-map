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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var google_maps_react_velez_1 = require("google-maps-react-velez");
var App_1 = require("./styles/App");
var CoordinatesSubmitForm_1 = require("./components/CoordinatesSubmitForm");
var UpdateMap_1 = require("./api/UpdateMap");
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
        _this.updateMap = new UpdateMap_1.UpdateMap();
        _this.centerMoved = _this.centerMoved.bind(_this);
        _this.initiateSearch = _this.initiateSearch.bind(_this);
        _this.state = {
            sampleLocation: { lat: 49.246292, lng: -123.116226 },
            items: [],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            map: {}
        };
        return _this;
    }
    App.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(CoordinatesSubmitForm_1["default"], { onFormSubmitted: this.initiateSearch }),
            react_1["default"].createElement(google_maps_react_velez_1.Map, { minZoom: 11, style: App_1.mapStyles, zoom: 14, onDragend: this.centerMoved, center: this.state.sampleLocation, initialCenter: this.state.sampleLocation, google: this.props.google, onReady: function (mapProps, map) {
                    _this.setState({ map: map });
                } },
                this.state.items.map(function (hit) {
                    var _a, _b;
                    return react_1["default"].createElement(google_maps_react_velez_1.Marker, { key: hit.id, onClick: _this.onMarkerClick, title: (_b = (_a = hit.player) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'No Name', position: { lat: hit.latitude, lng: hit.longitude } });
                }),
                react_1["default"].createElement(google_maps_react_velez_1.InfoWindow, { google: this.props.google, map: this.state.map, marker: this.state.activeMarker, visible: this.state.showingInfoWindow },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h1", null, this.state.selectedPlace.title))))));
    };
    App.prototype.initiateSearch = function (latitude, longitude) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.updateMap.renderNew(latitude, longitude)];
                    case 1:
                        data = _a.sent();
                        this.setState({
                            items: data.map(function (item) { return ({
                                latitude: item.latitude,
                                longitude: item.longitude,
                                player: item.player,
                                id: item.id
                            }); }),
                            sampleLocation: { lat: latitude, lng: longitude }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error("Couldn't updateMap", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.centerMoved = function (mapProps, map) {
        console.log("triggered");
        var newCords = { lat: map.getCenter().lat(), lng: map.getCenter().lng() };
        var oldCords = { lat: this.state.sampleLocation.lat, lng: this.state.sampleLocation.lng };
        var offset = 0.02;
        if ((newCords.lat > oldCords.lat + offset || newCords.lat < oldCords.lat - offset) || (newCords.lng > oldCords.lng + offset || newCords.lng < oldCords.lng - offset)) {
            this.initiateSearch(newCords.lat, newCords.lng);
        }
    };
    App.prototype.componentDidMount = function () {
        this.initiateSearch(49.246292, -123.116226);
    };
    return App;
}(react_1.Component));
exports["default"] = google_maps_react_velez_1.GoogleApiWrapper({
    apiKey: ('AIzaSyAogKkKTwajFfVxTfJ1xHJedhn-8xO6Psg')
})(App);
