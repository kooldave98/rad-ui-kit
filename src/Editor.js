import { OptionPicker } from './EditorFields.jsx';
const React = require('react');

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

<Editor renderers={[]}>
    <Field name="field1" type="text" label="Field1" help="" validators={[]} />
    <Field />
    <Field />
    <Action />
</Editor>



class Editor extends React.Component {
    constructor(props) {
        this.state = buildStateFromProps(props);
    }
    getDefaultProps() {
        return {
            propsCanResetState: false,
            fields: [
                {
                    name: "field1",
                    defaultValue: "",
                    label: "Field1",
                    helpMessage: "This should be a short message that helps the user",
                    validators: [],
                    options: { "option1": "123", "option2": "456" },
                    render: ({ meta, value, errors, handleChange, validate }) => {
                        return (
                            <div>
                                <label>{meta.label}</label>
                                <input onChange={e => handleChange(e.target.value)} />
                                {errors.map((e, i) => (
                                    <p className="help-block" key={i}>{e}</p>
                                ))}
                                {!!meta.helpMessage &&
                                    <span title={`${metadata.label} - help`} message={meta.helpMessage} />}
                            </div>
                        );
                    }
                }
            ]
        };
    }
    buildStateFromProps(inputProps) {
        return inputProps
            .metadata
            .reduce((acc, cur) => {
                acc[cur.name] = { value: cur.value, errors: [] };
                return acc;
            }, {});
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.propsCanResetState) {
            this.setState(this.buildStateFromProps(nextProps));
        }
    }
    handleChangeFor(name, value) {
        this.setState(oldState => {
            let fieldState = oldState[name];

            let val = {
                value,
                errors: [...fieldState.errors, this.runValidatorsFor(name, value)]
            };

            return { ...oldState, [name]: val };
        });
    }
    runValidatorsFor(name, value) {
        return [];
    }

    buildFormDataFromState() {
        let data = {};

        Object.keys(this.state).map((r, i) => {
            data[r] = this.state[r].value;
        });

        return data;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!errors) {
            let data = this.buildFormDataFromState();

            this.props.onSubmit(data, this.renderUpstreamErrors);
        }
    }

    renderUpstreamErrors(errorObject) {
        let newState = {};

        Object.keys(this.state).forEach(name => {
            let value = this.state[name].value;
            let errors = errorObject[name] || [];

            newState[name] = { value, errors };
        });

        this.setState(newState);
    }

    renderField(name, value, errors, index) {
        let meta = this.props.metadata.find(i => i.name === name);

        let handleChange = newValue => this.handleChangeFor(name, newValue);
        let validate = () => this.handleChangeFor(name, value);

        if (meta.render) {
            return meta.render({ meta, value, errors, handleChange, validate });
        }

        return (
            <input
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
            <form onSubmit={this.handleSubmit}>
                {Object.entries(this.state).map((entry, i) => {
                    let val = entry[1];
                    return this.renderField(entry[0], val.value, val.errors, i);
                })}
                <button type="submit">Submit</button>
            </form>
        );
    }
}

module.exports = { Editor };