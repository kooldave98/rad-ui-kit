//validator interface
//value => array<string> 

var MinimumNCharacters = function MinimumNCharacters(v, n) {
    return function (v) {
        return v.length < n ? ["Field is less than " + n + " characters"] : [];
    };
};

export var Minimum5Characters = function Minimum5Characters(v) {
    return MinimumNCharacters(v, 5);
};

export var Required = function Required(v) {
    return !v ? ["This is required"] : [];
};