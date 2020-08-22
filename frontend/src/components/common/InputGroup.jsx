import React from 'react';

function InputGroup({ name, placeholder, value, onChange, error }) {
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

export default InputGroup;
