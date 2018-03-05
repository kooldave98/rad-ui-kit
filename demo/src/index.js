import React, { Component } from 'react';
import { render } from 'react-dom';

import { Editor } from '../../src';
import { Required } from '../../src/FieldValidators';

let fields = [
  {
    name: "field1",
    defaultValue: "",
    label: "Field1",
    helpMessage: "This should be a short message that helps the user",
    validators: [Required]
  },
  // {
  //   name: "field1",
  //   defaultValue: "",
  //   label: "Field1",
  //   helpMessage: "This should be a short message that helps the user",
  //   validators: [],
  //   options: { "option1": "123", "option2": "456" },
  //   render: ({ meta, value, errors, handleChange, validate, key }) => {
  //     return (
  //       <div key={key}>
  //         <label>{meta.label}</label>
  //         <input onChange={e => handleChange(e.target.value)} />
  //         {errors.map((e, i) => (
  //           <p className="help-block" key={i}>{e}</p>
  //         ))}
  //         {!!meta.helpMessage &&
  //           <span title={`${meta.label} - help`} message={meta.helpMessage} />}
  //       </div>
  //     );
  //   }
  //}
];

let onSubmit = (data, handleServerErrors) => {
  handleServerErrors({ field1: ["Server error"] });
};

class Demo extends Component {
  render() {
    return <div>
      <h4>rad-ui-kit-editor</h4>
      <Editor onSubmit={onSubmit} fields={fields} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'));
