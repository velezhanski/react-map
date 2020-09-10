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
var CoordinatesSubmitForm = /** @class */ (function (_super) {
    __extends(CoordinatesSubmitForm, _super);
    function CoordinatesSubmitForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleFormSubmission = _this.handleFormSubmission.bind(_this);
        _this.handleLatChange = _this.handleLatChange.bind(_this);
        _this.handleLngChange = _this.handleLngChange.bind(_this);
        _this.state = { latitude: 40.7128, longitude: -74.0060 };
        return _this;
    }
    CoordinatesSubmitForm.prototype.render = function () {
        return react_1["default"].createElement("form", { onSubmit: this.handleFormSubmission },
            react_1["default"].createElement("input", { type: "text", name: "latitude", placeholder: "Latitude", value: this.state.latitude, onChange: this.handleLatChange }),
            react_1["default"].createElement("input", { type: "text", name: "longitude", placeholder: "Longitude", value: this.state.longitude, onChange: this.handleLngChange }),
            react_1["default"].createElement("button", { value: "Send", type: "submit" }, "Update"));
    };
    CoordinatesSubmitForm.prototype.handleLatChange = function (_a) {
        var target = _a.target;
        this.setState({
            latitude: target.value
        });
    };
    CoordinatesSubmitForm.prototype.handleLngChange = function (_a) {
        var target = _a.target;
        this.setState({
            longitude: target.value
        });
    };
    CoordinatesSubmitForm.prototype.handleFormSubmission = function (event) {
        event.preventDefault();
        if (this.state.latitude === 0 || this.state.longitude === 0) {
            return;
        }
        this.props.onFormSubmitted(this.state.latitude, this.state.longitude);
    };
    return CoordinatesSubmitForm;
}(react_1["default"].Component));
exports["default"] = CoordinatesSubmitForm;
