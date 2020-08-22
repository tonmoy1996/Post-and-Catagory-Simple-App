import React from 'react';

function SelectGroup({ name, value, onChange, options, onSelectChange }) {
  return (
    <select
      className='custom-select'
      name={name}
      value={value}
      onChange={onChange}
    >
      <option key='choose'> Choose.. </option>
      <option key='new' value='new'>
        Create New
      </option>
      {options.map((item) => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}

export default SelectGroup;
