var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { OptionPicker } from './EditorFields';
import React, { Component } from 'react';

/*

//Metadata interface

let dataTypes = ['static-text', 'text', 'large-text', 'date', 'select', 'number', 'color'];
text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color

let requiredValidator = v => !v ? ["This is required"] : [];

*/

var renderOptionPicker = function renderOptionPicker(value, prop) {
    return React.createElement(OptionPicker, {
        autoComplete: 'nope',
        name: prop.name,
        id: prop.name,
        placeholder: prop.label,
        value: value || "",
        onChange: handleChange,
        options: prop.options
    });
};

/* 
<Editor renderers={[]}>
    <Field name="field1" type="text" label="Field1" help="" validators={[]} />
    <Field />
    <Field />
    <Action />
</Editor> 
*/

var buildStateFromProps = function buildStateFromProps(inputProps) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return inputProps.fields.reduce(function (acc, cur) {
        var fieldState = state[cur.name] || {};
        acc[cur.name] = { value: fieldState.value || cur.defaultValue, errors: [] };
        return acc;
    }, {});
};

var runValidatorsFor = function runValidatorsFor(name, value, props) {
    return props.fields.find(function (f) {
        return f.name === name;
    }).validators.map(function (vtor) {
        return vtor(value);
    }).reduce(function (a, b) {
        return a.concat(b);
    }, []);
};

var buildFormData = function buildFormData(state) {
    var data = {};
    var allErrors = [];

    Object.entries(state).forEach(function (entry, i) {
        data[entry[0]] = entry[1].value;
        allErrors = [].concat(allErrors, entry[1].errors);
    });

    return { data: data, allErrors: allErrors };
};

export var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = buildStateFromProps(props);
        return _this;
    }

    Editor.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.setState(function (state) {
            return buildStateFromProps(nextProps, state);
        });
    };

    Editor.prototype.handleChangeFor = function handleChangeFor(name, value) {
        var _this2 = this;

        this.setState(function (oldState) {
            var _extends2;

            var fieldState = oldState[name];

            var val = {
                value: value,
                errors: [].concat(runValidatorsFor(name, value, _this2.props))
            };

            return _extends({}, oldState, (_extends2 = {}, _extends2[name] = val, _extends2));
        });
    };

    Editor.prototype.runAllValidators = function runAllValidators(onComplete) {
        var _this3 = this;

        this.setState(function (oldState) {
            var newState = {};

            _this3.props.fields.forEach(function (i) {
                var fieldState = oldState[i.name];

                var val = {
                    value: fieldState.value,
                    errors: [].concat(runValidatorsFor(i.name, fieldState.value, _this3.props))
                };

                newState[i.name] = val;
            });

            return newState;
        }, onComplete);
    };

    Editor.prototype.handleSubmit = function handleSubmit(e) {
        var _this4 = this;

        e.preventDefault();

        this.runAllValidators(function () {
            var formData = buildFormData(_this4.state);
            if (formData.allErrors.length === 0) {
                _this4.props.onSubmit(formData.data, _this4.renderUpstreamErrors.bind(_this4));
            }
        });
    };

    Editor.prototype.renderUpstreamErrors = function renderUpstreamErrors(errorObject) {
        this.setState(function (state) {
            var newState = {};

            Object.entries(state).forEach(function (entry) {
                var errors = errorObject[entry[0]] || [];

                newState[entry[0]] = { value: entry[1].value, errors: [].concat(entry[1].errors, errors) };
            });

            return newState;
        });
    };

    Editor.prototype.renderField = function renderField(name, value, errors, key) {
        var _this5 = this;

        var meta = this.props.fields.find(function (i) {
            return i.name === name;
        });

        var handleChange = function handleChange(newValue) {
            return _this5.handleChangeFor(name, newValue);
        };
        var validate = function validate() {
            return _this5.handleChangeFor(name, value);
        };

        if (meta.render) {
            var props = { meta: meta, value: value, errors: errors, handleChange: handleChange, validate: validate, key: key };
            return React.createElement(meta.render, props);
        }

        return React.createElement('input', {
            key: key,
            type: 'text',
            name: name,
            id: name,
            onChange: function onChange(e) {
                return handleChange(e.target.value);
            },
            placeholder: name,
            value: value || "" });
    };

    Editor.prototype.render = function render() {
        var _this6 = this;

        return React.createElement(
            'form',
            { onSubmit: function onSubmit(e) {
                    return _this6.handleSubmit(e);
                } },
            Object.entries(this.state).map(function (entry, i) {
                var val = entry[1];
                return _this6.renderField(entry[0], val.value, val.errors, i);
            }),
            this.props.actions.map(function (EditorAction, index) {
                return React.createElement(EditorAction, { key: index });
            })
        );
    };

    return Editor;
}(Component);;

Editor.defaultProps = {
    fields: [{
        name: "field1",
        defaultValue: "",
        label: "Field1",
        helpMessage: "This should be a short message that helps the user",
        validators: [],
        options: { "option1": "123", "option2": "456" },
        render: function render(_ref) {
            var meta = _ref.meta,
                value = _ref.value,
                errors = _ref.errors,
                handleChange = _ref.handleChange,
                validate = _ref.validate;
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'label',
                    null,
                    meta.label
                ),
                React.createElement('input', { onChange: function onChange(e) {
                        return handleChange(e.target.value);
                    } }),
                errors.map(function (e, i) {
                    return React.createElement(
                        'p',
                        { key: i },
                        e
                    );
                }),
                !!meta.helpMessage && React.createElement('span', { title: meta.label + ' - help', message: meta.helpMessage })
            );
        }

    }],
    actions: [function () {
        return React.createElement(
            'button',
            { type: 'submit' },
            'Submit'
        );
    }]
};