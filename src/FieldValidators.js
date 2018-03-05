let MinimumNCharacters = (v, n) => {
    return v => v.length < n ? [`Field is less than ${n} characters`] : [];
};

export const Minimum5Characters = v => MinimumNCharacters(v, 5);

export const Required = v => !v ? ["This is required"] : [];