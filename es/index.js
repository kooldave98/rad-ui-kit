import React from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

export var AddHeadingView = function AddHeadingView(_ref) {
  var addHeading = _ref.addHeading;

  var nodeInput = void 0;

  return React.createElement(
    'div',
    null,
    React.createElement(
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
      React.createElement(TextField, {
        name: 'text-field-controlled',
        ref: function ref(node) {
          nodeInput = node;
        }
      }),
      React.createElement(
        FloatingActionButton,
        { type: 'submit', mini: true },
        React.createElement(ContentAdd, null)
      )
    )
  );
};

export default AddHeadingView;