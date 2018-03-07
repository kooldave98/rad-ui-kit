import React from 'react';

export var OptionPicker = function OptionPicker(props) {
    return React.createElement(
        'select',
        {
            name: props.name,
            value: props.value,
            id: props.id,
            className: props.className,
            onChange: props.onChange },
        React.createElement(
            'option',
            null,
            props.placeholder
        ),
        Object.keys(props.options).map(function (r, i) {
            return React.createElement(
                'option',
                { key: i, value: props.options[r] },
                r
            );
        })
    );
};