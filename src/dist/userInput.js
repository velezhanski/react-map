"use strict";
exports.__esModule = true;
exports.PersonScoreForm = void 0;
var react_hook_form_1 = require("react-hook-form");
var react_1 = require("react");
exports.PersonScoreForm = function () {
    var _a = react_hook_form_1.useForm(), register = _a.register, handleSubmit = _a.handleSubmit;
    var onSubmit = function (data) {
        console.log("data", data);
    };
    return (react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1["default"].createElement("div", { className: "field" },
            react_1["default"].createElement("label", { htmlFor: "name" }, "Name"),
            react_1["default"].createElement("input", { type: "text", id: "name", name: "name", ref: register })),
        react_1["default"].createElement("div", { className: "field" },
            react_1["default"].createElement("label", { htmlFor: "email" }, "Email"),
            react_1["default"].createElement("input", { type: "email", id: "email", name: "email", ref: register })),
        react_1["default"].createElement("div", { className: "field" },
            react_1["default"].createElement("label", { htmlFor: "score" }, "Score"),
            react_1["default"].createElement("input", { type: "number", id: "score", name: "score", ref: register })),
        react_1["default"].createElement("button", { type: "submit" }, "Save")));
};
