import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

function SelectInput({ options, onSelectChange }) {
  return (
    <div className='form-group'>
      <Select
        options={options}
        className='mb-3'
        placeholder='select catagory'
        isSearchable
        isMulti
        onChange={onSelectChange}
        components={animatedComponents}
      />
    </div>
  );
}

export default SelectInput;
