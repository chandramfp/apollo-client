import React from 'react';
import PropTypes from 'prop-types';

import Select, { P } from './style';

const SelectField = (props) => {
  // console.log('props inside SelectField', props);
  const {
    options, defaultText, onChange, Value, error, onBlur,

  } = props;
  console.log('inside selectField', onBlur);
  return (
    <>
      <Select value={Value} onChange={onChange} onBlur={onBlur}>
        {defaultText && <option>{defaultText}</option>}
        {
          options && options.length && options.map(({ value, label }) => (
            <option key={label} value={value}>{label}</option>
          ))
        }


      </Select>
      <P>{error}</P>
    </>
  );
};

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultText: PropTypes.string.isRequired,
  Value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectField.defaultProps = {
  error: '',
};

export default SelectField;
