'use strict';

exports.__esModule = true;
exports.AddHeadingView = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FloatingActionButton = require('material-ui/FloatingActionButton');

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _add = require('material-ui/svg-icons/content/add');

var _add2 = _interopRequireDefault(_add);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddHeadingView = exports.AddHeadingView = function AddHeadingView(_ref) {
  var addHeading = _ref.addHeading;

  var nodeInput = void 0;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'form',
      {
        onSubmit: function onSubmit(e) {
          e.preventDefault();
          if (!nodeInput.input.value.trim()) {
            return;
          }
          addHeading(nodeInput.input.value);
          nodeInput.input.value = "";
        }
      },
      _react2.default.createElement(_TextField2.default, {
        name: 'text-field-controlled',
        ref: function ref(node) {
          nodeInput = node;
        }
      }),
      _react2.default.createElement(
        _FloatingActionButton2.default,
        { type: 'submit', mini: true },
        _react2.default.createElement(_add2.default, null)
      )
    )
  );
};

exports.default = AddHeadingView;