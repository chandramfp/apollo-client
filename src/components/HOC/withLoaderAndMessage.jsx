import React from 'react';

const withLoaderAndMessage = (Wrapper) => (props) => {
  const { loading, count, ...rest } = props;
  return (<Wrapper loading={loading} count={count} {...rest} />);
};
export default withLoaderAndMessage;
