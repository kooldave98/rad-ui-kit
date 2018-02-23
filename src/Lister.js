import Dropdown from './Dropdown.jsx';
const React = require('react');
const Report = require('./Report.jsx');
const Layout = require('./MultiColumnLayout.jsx');

//TODO: Need to do prop types to validate that 'items' is not null or empty and other validations

var Table = React.createClass({
    getDefaultProps() {
        return {
            order: [],
            id: ""
        };
    },
    mapSingleAction(title, handler, i) {

        if (typeof (handler) !== "function") {
            return handler;
        }

        return (
            <button onClick={handler} className="btn btn-block btn-xs btn-default" key={i}>
                {title}
            </button>
        );
    },
    mapRow(item, i) {
        let viewModel = this.props.getItemViewModel(item);
        let isHighlighted = viewModel.isHighlighted && viewModel.isHighlighted();
        return (
            <tr className={`break-word ${isHighlighted ? "warning" : ""}`} key={i}>
                {
                    viewModel.fields.map((f, i) => (
                        <td key={i}>{f.displayText || "--"}</td>
                    ))
                }

                {
                    Object.keys(viewModel.actions).length === 1 &&
                    <td>{Object.keys(viewModel.actions).map((k, i) => this.mapSingleAction(k, viewModel.actions[k], i))}</td>
                }

                {
                    Object.keys(viewModel.actions).length > 1 &&
                    <td><Dropdown label={"Actions"} actions={viewModel.actions} /></td>
                }

                {
                    Object.keys(viewModel.actions).length === 0 &&
                    <td>--</td>
                }
            </tr>
        );
    },
    mapHeader() {
        let anyViewModel = this.props.getItemViewModel(this.props.items[0]);

        let actionsCount = Object.keys(anyViewModel.actions).length;
        let fieldsCount = anyViewModel.fields.length;

        return anyViewModel.fields.map((f, i) => (
            <th key={i}>{f.label || "--"}</th>
        )).concat(actionsCount > 0 ? [(<th key={fieldsCount}>--</th>)] : [])
    },
    render() {
        return (
            <div ref="tableContext" className="table-responsive">
                <table className="table spaced-out-rows">
                    {this.props.items.length > 0 &&
                        <thead>
                            <tr>
                                {this.mapHeader()}
                            </tr>
                        </thead>
                    }
                    <tbody>
                        {this.props.items.map(this.mapRow)}
                    </tbody>
                </table>
            </div>
        );
    },
});

var Lister = React.createClass({
    getDefaultProps() {
        return {
            noItemsView: (<span>No items available...</span>)
        };
    },
    getInitialState() {
        return { renderAsReports: this.props.renderAsReports === true };
    },
    mapItem(item, i) {
        return (
            <Report
                key={i}
                {...this.props.getItemViewModel(item, i)}
            />
        );
    },
    render() {
        return (
            <div className={this.props.className}>
                {this.props.headerCell}
                <br />
                {
                    this.props.items.length ?
                        (
                            this.state.renderAsReports ?
                                this.props.items.map(this.mapItem) :
                                <Table {... this.props} />
                        )
                        : this.props.noItemsView
                }
                <br />
                {this.props.footerCell}
            </div>
        );
    }
});

module.exports = Lister;