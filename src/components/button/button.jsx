
import React from 'react';
import PropTypes from 'prop-types';

import { Buttons } from './style';

const Button = (props) => {
  const {
    color, disabled, style, value, onClick,
  } = props;
  return (
    <>
      <Buttons
        type={value}
        style={style}
        color={color}
        disabled={disabled}
        onClick={onClick}
      >
        {value}
      </Buttons>
    </>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'default' || 'primary',
  disabled: false,
  style: {},
};


export default Button;
