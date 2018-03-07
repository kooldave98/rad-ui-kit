'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Dropdown = require('./Dropdown.jsx');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var Report = require('./Report.jsx');
var Layout = require('./MultiColumnLayout.jsx');

//TODO: Need to do prop types to validate that 'items' is not null or empty and other validations

var Table = React.createClass({
    displayName: 'Table',
    getDefaultProps: function getDefaultProps() {
        return {
            order: [],
            id: ""
        };
    },
    mapSingleAction: function mapSingleAction(title, handler, i) {

        if (typeof handler !== "function") {
            return handler;
        }

        return React.createElement(
            'button',
            { onClick: handler, className: 'btn btn-block btn-xs btn-default', key: i },
            title
        );
    },
    mapRow: function mapRow(item, i) {
        var _this = this;

        var viewModel = this.props.getItemViewModel(item);
        var isHighlighted = viewModel.isHighlighted && viewModel.isHighlighted();
        return React.createElement(
            'tr',
            { className: 'break-word ' + (isHighlighted ? "warning" : ""), key: i },
            viewModel.fields.map(function (f, i) {
                return React.createElement(
                    'td',
                    { key: i },
                    f.displayText || "--"
                );
            }),
            Object.keys(viewModel.actions).length === 1 && React.createElement(
                'td',
                null,
                Object.keys(viewModel.actions).map(function (k, i) {
                    return _this.mapSingleAction(k, viewModel.actions[k], i);
                })
            ),
            Object.keys(viewModel.actions).length > 1 && React.createElement(
                'td',
                null,
                React.createElement(_Dropdown2.default, { label: "Actions", actions: viewModel.actions })
            ),
            Object.keys(viewModel.actions).length === 0 && React.createElement(
                'td',
                null,
                '--'
            )
        );
    },
    mapHeader: function mapHeader() {
        var anyViewModel = this.props.getItemViewModel(this.props.items[0]);

        var actionsCount = Object.keys(anyViewModel.actions).length;
        var fieldsCount = anyViewModel.fields.length;

        return anyViewModel.fields.map(function (f, i) {
            return React.createElement(
                'th',
                { key: i },
                f.label || "--"
            );
        }).concat(actionsCount > 0 ? [React.createElement(
            'th',
            { key: fieldsCount },
            '--'
        )] : []);
    },
    render: function render() {
        return React.createElement(
            'div',
            { ref: 'tableContext', className: 'table-responsive' },
            React.createElement(
                'table',
                { className: 'table spaced-out-rows' },
                this.props.items.length > 0 && React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        this.mapHeader()
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    this.props.items.map(this.mapRow)
                )
            )
        );
    }
});

var Lister = React.createClass({
    displayName: 'Lister',
    getDefaultProps: function getDefaultProps() {
        return {
            noItemsView: React.createElement(
                'span',
                null,
                'No items available...'
            )
        };
    },
    getInitialState: function getInitialState() {
        return { renderAsReports: this.props.renderAsReports === true };
    },
    mapItem: function mapItem(item, i) {
        return React.createElement(Report, _extends({
            key: i
        }, this.props.getItemViewModel(item, i)));
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: this.props.className },
            this.props.headerCell,
            React.createElement('br', null),
            this.props.items.length ? this.state.renderAsReports ? this.props.items.map(this.mapItem) : React.createElement(Table, this.props) : this.props.noItemsView,
            React.createElement('br', null),
            this.props.footerCell
        );
    }
});

module.exports = Lister;