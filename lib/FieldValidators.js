"use strict";

exports.__esModule = true;
//validator interface
//value => array<string> 

var MinimumNCharacters = function MinimumNCharacters(v, n) {
    return function (v) {
        return v.length < n ? ["Field is less than " + n + " characters"] : [];
    };
};

var Minimum5Characters = exports.Minimum5Characters = function Minimum5Characters(v) {
    return MinimumNCharacters(v, 5);
};

var Required = exports.Required = function Required(v) {
    return !v ? ["This is required"] : [];
};