import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { P } from './style';

const RadioGroup = (props) => {
  // console.log('inside RadioGroup', props);
  const {
    options, onChange, error, onBlur,
  } = props;
  console.log(':::::::::::::::::::', onBlur);
  return (
    <>
      {
        options && options.length && options.map(({ value, label }) => (
          <Fragment key={label}>
            <input type="radio" name="RadioButton" value={value} onChange={onChange} onBlur={onBlur} />
            {label}
            <br />
          </Fragment>
        ))
      }
      <P>{error}</P>
    </>
  );
};

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
};

export default RadioGroup;
