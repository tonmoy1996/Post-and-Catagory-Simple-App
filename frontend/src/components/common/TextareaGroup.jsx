import React from 'react';

function TextareaGroup({ name, placeholder, value, onChange }) {
  return (
    <div className='form-group'>
      <textarea
        type='text'
        className='form-control'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        rows="3"
      ></textarea>
    </div>
  );
}

export default TextareaGroup;
