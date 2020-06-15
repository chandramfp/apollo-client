import React from 'react';
import PropType from 'prop-types';

import { Operators } from '../../configs/constants';

class Math extends React.Component {
  Result = (first, second, operator) => {
    let result = first + operator + second;
    // console.log(result);
    result = (Operators.includes(operator)) ? eval(result) : 'Invalid Operation';
    return result;
  };

  render() {
    const {
      first, second, operator, children,
    } = this.props;
    const result = this.Result(first, second, operator);
    return (children !== undefined)
      ? (<p>{children(first, second, operator, result)}</p>)
      : (<p>{`${first} ${operator} ${second} = ${result}`}</p>);
  }
}


Math.propTypes = {
  first: PropType.number.isRequired,
  second: PropType.number.isRequired,
  operator: PropType.oneOf(['+', '-', '/', '*', '^']).isRequired,
  children: PropType.func,
};
Math.defaultProps = {
  children: undefined,
};

export default Math;
