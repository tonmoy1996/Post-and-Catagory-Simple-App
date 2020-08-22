import React from 'react';

function InputGroup({ name, placeholder, value, onChange }) {
  return (
    <div className='form-group'>
      <input
        type='text'
        className='form-control'
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputGroup;
