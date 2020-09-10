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
exports.CustomMarker = void 0;
var google_maps_react_1 = require("google-maps-react");
var CustomMarker = /** @class */ (function (_super) {
    __extends(CustomMarker, _super);
    function CustomMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomMarker.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.map !== prevProps.map ||
            (this.props.icon && (this.props.icon.url !== prevProps.icon.url)) ||
            (this.props.position.lat !== prevProps.position.lat ||
                this.props.position.lng !== prevProps.position.lng)) {
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.renderMarker();
        }
    };
    return CustomMarker;
}(google_maps_react_1.Marker));
exports.CustomMarker = CustomMarker;
