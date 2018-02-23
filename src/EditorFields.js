const React = require('react');

export const OptionPicker = React.createClass({
    render() {

        return (
            <select
                name={this.props.name}
                value={this.props.value}
                id={this.props.id}
                className={this.props.className}
                onChange={this.props.onChange}>
                <option>{this.props.placeholder}</option>
                {Object.keys(this.props.options).map((r, i) =>
                    <option key={i} value={this.props.options[r]}>{r}</option>
                )}
            </select>
        );
    }
});