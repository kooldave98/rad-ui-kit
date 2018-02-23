import { OptionPicker } from './EditorFields.jsx';
const React = require('react');

/*

//Metadata interface

let dataTypes = ['static-text', 'text', 'large-text', 'date', 'select', 'number', 'color'];
text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color

let requiredValidator = v => !v ? ["This is required"] : [];

*/

const Editor = React.createClass({
    getDefaultProps() {
        return {
            submitOnEnter: false,
            submitButtonText: "Save",
            submitButtonAsBlock: false,
            showLabelAsPlaceholder: false,
            propsCanResetState: false,
            metadata: [
                {
                    name: "field1",
                    value: "",
                    dataType: 'text',
                    label: "Field1",
                    helpMessage: "This should be a short message that helps the user",
                    validators: [],
                    options: { "option1": "123", "option2": "456" }
                }
            ],
        };
    },
    buildStateFromProps(inputProps) {
        return inputProps
            .metadata
            .reduce((acc, cur) => {
                acc[cur.name] = { value: cur.value, errors: [] };
                return acc;
            }, {});
    },
    getInitialState() {
        this.otherState = {};

        return this.buildStateFromProps(this.props);
    },
    componentWillReceiveProps(nextProps) {
        if (this.props.propsCanResetState) {
            this.setState(this.buildStateFromProps(nextProps));
        }
    },
    handleChange(e) {
        let fieldState = this.state[e.target.name];

        let val = {
            value: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            errors: fieldState.errors
        };

        let newState = { [e.target.name]: val };

        this.setState(newState);
    },
    handleFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            this.otherState[e.target.name] = e.target.files[0];
        }
    },
    validate(onValid, onInvalid) {
        let newState = {};

        let errors =
            this.props.metadata.map(i => {
                let value = this.state[i.name].value;
                let errors = i.validators.map(v => v(value)).flatMap(i => i);

                newState[i.name] = { value, errors };

                return errors;
            });

        this.setState(newState, o => {
            if (errors.flatMap(i => i).length > 0) {
                onInvalid();
            } else {
                onValid();
            }
        });
    },
    buildFormDataFromState() {
        let data = {};

        Object.keys(this.state).map((r, i) => {
            data[r] = this.state[r].value;
        });

        return data;
    },
    handleSubmit(onFormIsValidExternalHook, onFormIsInValidExternalHook) {
        this.validate(s => {
            let data = this.buildFormDataFromState();

            onFormIsValidExternalHook && onFormIsValidExternalHook();

            let mergedData = Object.assign(data, this.otherState);

            this.props.onSubmit(mergedData, this.renderUpstreamErrors);
        }, e => {
            onFormIsInValidExternalHook && onFormIsInValidExternalHook();
        });
    },
    renderUpstreamErrors(errorObject) {
        let newState = {};

        Object.keys(this.state).forEach(name => {
            let value = this.state[name].value;
            let errors = errorObject[name] || [];

            newState[name] = { value, errors };
        });

        this.setState(newState);
    },
    renderTextArea(value, prop) {
        let attributes = {
            type: prop.dataType,
            name: prop.name,
            id: prop.name,
            className: "form-control",
            onChange: this.handleChange,
            rows: 3,
            value: value || ""
        };

        if (this.props.showLabelAsPlaceholder) {
            attributes.placeholder = prop.label;
        }

        return (
            <textarea autoComplete="nope" {...attributes} />
        );
    },
    renderInput(value, prop) {
        let attributes = {
            type: prop.dataType,
            name: prop.name,
            id: prop.name,
            className: "form-control",
            onChange: this.handleChange,
        };

        attributes.value = value || "";

        if (this.props.showLabelAsPlaceholder) {
            attributes.placeholder = prop.label;
        }



        return (
            <input autoComplete="nope" {...attributes} />
        );
    },
    renderStaticText(value, prop) {
        return (
            <p className="form-control-static">{value}</p>
        );
    },
    renderOptionPicker(value, prop) {
        return (
            <OptionPicker
                autoComplete="nope"
                name={prop.name}
                id={prop.name}
                className="form-control"
                placeholder={this.props.showLabelAsPlaceholder ? prop.label : "--"}
                value={value || ""}
                onChange={this.handleChange}
                options={prop.options}
            />
        );
    },
    determineElement(value, metadata) {
        if (metadata.dataType === "select") {
            return this.renderOptionPicker(value, metadata);
        }

        if (metadata.dataType === "static-text") {
            return this.renderStaticText(value, metadata);
        }

        if (metadata.dataType === "large-text") {
            return this.renderTextArea(value, metadata);
        }

        return this.renderInput(value, metadata);
    },
    mapField(name, value, errors, key) {
        let metadata = this.props.metadata.find(i => i.name === name);

        if (metadata.dataType === 'checkbox') {
            return (
                <div key={key} className="checkbox">
                    <label>
                        <input
                            name={metadata.name}
                            type="checkbox"
                            id={metadata.name}
                            checked={value}
                            onChange={this.handleChange}
                        />
                        {metadata.label}
                    </label>
                    {!!metadata.helpMessage &&
                        <span title={`${metadata.label} - help`} message={metadata.helpMessage} />}
                </div>
            );
        }

        return (
            <div key={key} className={"form-group " + (errors.length > 0 ? "has-error" : "")}>
                {this.props.showLabelAsPlaceholder ? null :
                    <label htmlFor={metadata.name}>{metadata.label}</label>}
                {!!metadata.helpMessage &&
                    <span title={`${metadata.label} - help`} message={metadata.helpMessage} />}
                {errors.map((e, i) => (
                    <p className="help-block" key={i}>{e}</p>
                ))}
                {this.determineElement(value, metadata)}
            </div>
        );
    },
    render() {
        return (
            <form autoComplete="off" style={this.props.style} className={this.props.className} onSubmit={e => { e.preventDefault(); this.handleSubmit(); }} role="form">
                {
                    Object.keys(this.state).map((r, i) => {
                        let val = this.state[r];
                        return this.mapField(r, val.value, val.errors, i);
                    })
                }
                <div className="form-group">
                    {this.props.children}
                </div>
                <button type="submit" className={`btn btn-primary ${this.props.submitButtonAsBlock ? "btn-block" : null}`}>{this.props.submitButtonText}</button>
            </form>
        );
    }
});

module.exports = { Editor };