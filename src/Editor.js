import { OptionPicker } from './EditorFields';
import React, { Component } from 'react';

/*

//Metadata interface

let dataTypes = ['static-text', 'text', 'large-text', 'date', 'select', 'number', 'color'];
text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color

let requiredValidator = v => !v ? ["This is required"] : [];

*/

const renderOptionPicker = (value, prop) => {
    return (
        <OptionPicker
            autoComplete="nope"
            name={prop.name}
            id={prop.name}
            placeholder={prop.label}
            value={value || ""}
            onChange={handleChange}
            options={prop.options}
        />
    );
}

/* 
<Editor renderers={[]}>
    <Field name="field1" type="text" label="Field1" help="" validators={[]} />
    <Field />
    <Field />
    <Action />
</Editor> 
*/

let buildStateFromProps = (inputProps, state = {}) => {
    return inputProps
        .fields
        .reduce((acc, cur) => {
            let fieldState = state[cur.name] || {};
            acc[cur.name] = { value: fieldState.value || cur.defaultValue, errors: [] };
            return acc;
        }, {});
}

let runValidatorsFor = (name, value, props) => {
    return props
        .fields
        .find(f => f.name === name)
        .validators
        .map(vtor => vtor(value))
        .reduce((a, b) => a.concat(b), []);
}

let buildFormDataFromState = (state) => {
    let data = {};

    Object.entries(state).forEach((entry, i) => {
        data[entry[0]] = entry[1].value;
    });

    return data;
}

let buildFormErrorsFromState = (state) => {
    let data = {};

    Object.entries(state).forEach((entry, i) => {
        data[entry[0]] = entry[1].errors;
    });

    return data;
}

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = buildStateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(state => buildStateFromProps(nextProps, state));
    }

    handleChangeFor(name, value) {
        this.setState(oldState => {
            let fieldState = oldState[name];

            let val = {
                value,
                errors: [...fieldState.errors, runValidatorsFor(name, value, this.props)]
            };

            return { ...oldState, [name]: val };
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let state = this.state;
        let errors = buildFormErrorsFromState(state);
        console.log(state);
        console.log(errors);
        if (errors.length === 0) {
            let data = buildFormDataFromState(state);
            this.props.onSubmit(data, this.renderUpstreamErrors);
        }
    }

    renderUpstreamErrors(errorObject) {
        this.setState(state => {
            let newState = {};

            Object.entries(state).forEach(([name, value]) => {
                let errors = errorObject[name] || [];

                newState[name] = { value, errors };
            });

            return newState;
        });
    }

    renderField(name, value, errors, key) {
        let meta = this.props.fields.find(i => i.name === name);

        let handleChange = newValue => this.handleChangeFor(name, newValue);
        let validate = () => this.handleChangeFor(name, value);

        if (meta.render) {
            return meta.render({ meta, value, errors, handleChange, validate, key });
        }

        return (
            <input
                key={key}
                type='text'
                name={name}
                id={name}
                onChange={e => handleChange(e.target.value)}
                placeholder={name}
                value={value || ""} />
        );
    }
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                {Object.entries(this.state).map((entry, i) => {
                    let val = entry[1];
                    return this.renderField(entry[0], val.value, val.errors, i);
                })}
                <button type="submit">Submit</button>
            </form>
        );
    }
};

Editor.defaultProps = {
    fields: [
        {
            name: "field1",
            defaultValue: "",
            label: "Field1",
            helpMessage: "This should be a short message that helps the user",
            validators: [],
            options: { "option1": "123", "option2": "456" },
            render: ({ meta, value, errors, handleChange, validate, key }) => {
                return (
                    <div key={key}>
                        <label>{meta.label}</label>
                        <input onChange={e => handleChange(e.target.value)} />
                        {errors.map((e, i) => (
                            <p className="help-block" key={i}>{e}</p>
                        ))}
                        {!!meta.helpMessage &&
                            <span title={`${meta.label} - help`} message={meta.helpMessage} />}
                    </div>
                );
            }
        }
    ]
};