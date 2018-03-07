import React, { Component } from 'react';
import { render } from 'react-dom';

import { Editor, Required, Minimum5Characters } from '../../src';

let standardInputField = ({ meta, value, errors, handleChange, validate, key }) => {
  return (
    <div key={key}>
      <label>{meta.label}</label>
      <input onChange={e => handleChange(e.target.value)} />
      {!!meta.helpMessage &&
        <span>{meta.helpMessage}</span>}
      {errors.map((e, i) => (
        <p className="help-block" key={i}>{e}</p>
      ))}
    </div>
  );
};

let fields = [
  {
    name: "firstname",
    defaultValue: "",
    label: "First Name",
    helpMessage: "Please enter your first name here",
    validators: [Required],
    options: { "option1": "123", "option2": "456" },
    render: standardInputField
  },
  {
    name: "lastname",
    defaultValue: "",
    label: "Last Name",
    helpMessage: "Please enter your surname here",
    validators: [Required],
    options: { "option1": "123", "option2": "456" },
    render: standardInputField
  }
];

let actions = [
  () => (<button type="submit">Submittt</button>)
];

let onSubmit = (data, handleServerErrors) => {
  console.log(data);
  //handleServerErrors({ field1: ["Server error"] });
};

class Demo extends Component {
  render() {
    return <div>
      <h4>rad-ui-kit-editor</h4>
      <Editor onSubmit={onSubmit} fields={fields} actions={actions} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'));
