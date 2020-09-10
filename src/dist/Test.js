"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_google_map_1 = require("react-google-map");
function App() {
    var _a = react_1.useState(null), mapRef = _a[0], setMapRef = _a[1];
    var _b = react_1.useState({ lat: 44.076613, lng: -98.362239833 }), center = _b[0], setCenter = _b[1];
    var _c = react_1.useState(null), clickedLatLng = _c[0], setClickedLatLng = _c[1];
    var isLoaded = react_google_map_1.useLoadScript({
        googleMapsApiKey: ""
    }).isLoaded;
    var renderMap = function () {
        return (react_1["default"].createElement(react_1.Fragment, null,
            react_1["default"].createElement(react_google_map_1.GoogleMap
            // Store a reference to the google map instance in state
            , { 
                // Store a reference to the google map instance in state
                onLoad: function (map) { return setMapRef(map); }, 
                // Save the current center position in state
                onCenterChanged: function () { return setCenter(mapRef.getCenter().toJSON()); }, 
                // Save the user's map click position
                onClick: function (e) { return setClickedLatLng(e.latLng.toJSON()); }, center: center, zoom: 5, mapContainerStyle: {
                    height: "50vh",
                    width: "100%"
                } }),
            react_1["default"].createElement("h3", null,
                "Center ",
                center.lat,
                ", ",
                center.lng),
            clickedLatLng && (react_1["default"].createElement("h3", null,
                "You clicked: ",
                clickedLatLng.lat,
                ", ",
                clickedLatLng.lng))));
    };
    return isLoaded ? renderMap() : null;
}
var rootElement = document.getElementById("root");
react_dom_1["default"].render(react_1["default"].createElement(App, null), rootElement);
