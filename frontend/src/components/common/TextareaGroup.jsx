import React from 'react';

function TextareaGroup({ name, placeholder, value, onChange, error }) {
  return (
    <div className='form-group'>
      <textarea
        type='text'
        className='form-control'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows='3'
      ></textarea>
      {error ? (
        <div class='alert alert-danger' role='alert'>
          {error}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default TextareaGroup;
