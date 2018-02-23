var MinimumNCharacters = (v,n) => {
    return v => v.length < n ? [`Field is less than ${n} characters`] : [];
};

var Minimum5Characters = v => MinimumNCharacters(v, 5);

module.exports = {
    Required: v => !v ? ["This is required"] : [],
    Minimum5Characters
};