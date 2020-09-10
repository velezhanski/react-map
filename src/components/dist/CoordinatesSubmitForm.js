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
var MessageForm = /** @class */ (function (_super) {
    __extends(MessageForm, _super);
    function MessageForm(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.state = { latitude: 0, longitude: 0 };
        return _this;
    }
    MessageForm.prototype.render = function () {
        return react_1["default"].createElement("form", null,
            react_1["default"].createElement("input", { type: "text", name: "inputLat", placeholder: "Latitude", value: this.state.latitude, onChange: this.handleChange }),
            react_1["default"].createElement("input", { type: "text", name: "inputLng", placeholder: "Longitude", value: this.state.longitude, onChange: this.handleChange }),
            react_1["default"].createElement("button", { value: "Send", onClick: this.handleChange }, "Update"));
    };
    MessageForm.prototype.handleChange = function (_a) {
        var target = _a.target;
        this.setState({
            latitude: target.value,
            longitude: target.value
        });
    };
    return MessageForm;
}(react_1["default"].Component));
exports["default"] = MessageForm;
