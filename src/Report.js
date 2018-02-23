const React = require('react');

var Report = React.createClass({
    mapField(field, i) {

        if (field.isHidden) {
            return null;
        }

        return (
            <div style={{ marginBottom: "7px" }} key={i} className="">
                <dt className="">{field.label}</dt>
                <dd className="preserve-line-breaks">{field.customView || field.displayText || "--"}</dd>
            </div>
        );
    },
    render() {
        return (
            <div className={`report ${this.props.classString}`}>
                {this.props.customView ||
                    <dl>
                        {this.props.fields.map(this.mapField)}
                    </dl>}
                {this.props.children}
            </div>
        );
    }
});

module.exports = Report;


