import React from 'react';
import PropTypes from 'prop-types';


import Input, { P } from './style';

// day 5
// const TextField = (props) => {
//   const { value, disabled, error } = props;
//   return (
//     <Input type="text" value={value} disabled={(disabled)} error={error} />
//   );
// };


const TextField = (props) => {
  const {
    onChange, value, error, onBlur,
  } = props;
  console.log('inside TextField', error);

  return (
    <>
      <Input type="text" onChange={onChange} value={value} onBlur={onBlur} />
      <P>
        {error}
      </P>

    </>
  );
};


TextField.propTypes = {

  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  error: '',
};

export default TextField;
