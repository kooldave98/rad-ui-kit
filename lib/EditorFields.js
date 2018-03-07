'use strict';

exports.__esModule = true;
exports.OptionPicker = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OptionPicker = exports.OptionPicker = function OptionPicker(props) {
    return _react2.default.createElement(
        'select',
        {
            name: props.name,
            value: props.value,
            id: props.id,
            className: props.className,
            onChange: props.onChange },
        _react2.default.createElement(
            'option',
            null,
            props.placeholder
        ),
        Object.keys(props.options).map(function (r, i) {
            return _react2.default.createElement(
                'option',
                { key: i, value: props.options[r] },
                r
            );
        })
    );
};