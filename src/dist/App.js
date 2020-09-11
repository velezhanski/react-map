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
var CoordinatesSubmitForm_1 = require("./components/CoordinatesSubmitForm");
var UpdateMap_1 = require("./api/UpdateMap");
var GoogleMap_1 = require("./components/GoogleMap");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.updateMap = new UpdateMap_1.UpdateMap();
        _this.googleMap = react_1["default"].createRef();
        return _this;
    }
    App.prototype.render = function () {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(CoordinatesSubmitForm_1["default"], { onFormSubmitted: this.googleMap.initiateSearch }),
            react_1["default"].createElement(GoogleMap_1["default"], { ref: this.googleMap })));
    };
    return App;
}(react_1["default"].Component));
exports["default"] = App;
