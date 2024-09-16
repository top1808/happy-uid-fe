import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpiner';

interface WithLoadingIndicatorProps {
  isLoading: boolean;
}

const withLoadingIndicator = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P & WithLoadingIndicatorProps) => {
    const { isLoading, ...restProps } = props;

    return (
      <>
        {isLoading ? <LoadingSpinner /> : <WrappedComponent {...(restProps as P)} />}
      </>
    );
  };
};

export default withLoadingIndicator;
