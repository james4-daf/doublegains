import React from 'react';
import { ImSpinner3 } from 'react-icons/im';

type Props = {};

const Loading = (props: Props) => {
  return (
    <>
      <ImSpinner3 className="loading-icon" />
    </>
  );
};

export default Loading;
