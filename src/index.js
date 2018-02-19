import React from "react";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

export const AddHeadingView = ({ addHeading }) => {
  let nodeInput;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!nodeInput.input.value.trim()) {
            return;
          }
          addHeading(nodeInput.input.value);
          nodeInput.input.value = "";
        }}
      >
        <TextField
          name="text-field-controlled"
          ref={node => {
            nodeInput = node;
          }}
        />
        <FloatingActionButton type="submit" mini={true}>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    </div>
  );
};

export default AddHeadingView;