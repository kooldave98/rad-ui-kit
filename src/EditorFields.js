import React from 'react';

export const OptionPicker = (props) => (
    <select
        name={props.name}
        value={props.value}
        id={props.id}
        className={props.className}
        onChange={props.onChange}>
        <option>{props.placeholder}</option>
        {Object.keys(props.options).map((r, i) =>
            <option key={i} value={props.options[r]}>{r}</option>
        )}
    </select>
);