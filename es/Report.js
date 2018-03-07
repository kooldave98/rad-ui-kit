var React = require('react');

var Report = React.createClass({
    displayName: "Report",
    mapField: function mapField(field, i) {

        if (field.isHidden) {
            return null;
        }

        return React.createElement(
            "div",
            { style: { marginBottom: "7px" }, key: i, className: "" },
            React.createElement(
                "dt",
                { className: "" },
                field.label
            ),
            React.createElement(
                "dd",
                { className: "preserve-line-breaks" },
                field.customView || field.displayText || "--"
            )
        );
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "report " + this.props.classString },
            this.props.customView || React.createElement(
                "dl",
                null,
                this.props.fields.map(this.mapField)
            ),
            this.props.children
        );
    }
});

module.exports = Report;