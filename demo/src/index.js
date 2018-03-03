import React, { Component } from 'react';
import { render } from 'react-dom';

import { Editor } from '../../src';

let fields = [
  {
    name: "field1",
    defaultValue: "",
    label: "Field1",
    helpMessage: "This should be a short message that helps the user",
    validators: []
  }
];

let onSubmit = (data) => {
  console.log(data);
};

class Demo extends Component {
  render() {
    return <div>
      <h1>simple-react-editor Demo</h1>
      <Editor onSubmit={onSubmit} fields={fields} />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
