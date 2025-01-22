import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { isStringControl } from '@jsonforms/core';

function TextAreaControl(props) {
  const {
    data,
    path,
    handleChange,
    required,       
    description,
    errors         
  } = props;

  const isEmptyRequired = required && (!data || data.trim() === '');

  return (
    <div style={{ marginBottom: '1rem' }}>
      <textarea
        style={{
          width: '100%',
          minHeight: '120px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          resize: 'vertical'
        }}
        placeholder={description}
        value={data || ''}
        onChange={(e) => handleChange(path, e.target.value)}
      />

         {errors ? (
        <div style={{ color: 'red', marginTop: 4 }}>{errors}</div>
      ) : null}
    </div>
  );
}

export const textAreaControlTester = (uischema, schema) => {
  if (
    isStringControl(uischema, schema) &&
    uischema.scope === '#/properties/helpMessage'
  ) {
    return 999;
  }
  return -1;
};

export default withJsonFormsControlProps(TextAreaControl);
