import React from 'react';

function reducer(state, action) {
  return { ...state, ...action };
}

const initialState = { data: null, status: 'idle' };

function useSafeDispatch(dispatch) {
  const isMounted = React.useRef(false);

  React.useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => (isMounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

function useAsync() {
  const [{ data, status, error }, setState] = React.useReducer(
    reducer,
    initialState
  );

  const safeSetState = useSafeDispatch(setState);

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error('function is not promise');
      }

      safeSetState({ status: 'pending' });

      return promise.then(
        (data) => {
          safeSetState({ data, status: 'resolved' });

          return data;
        },
        (error) => {
          safeSetState({ error, status: 'rejected' });

          return error;
        }
      );
    },
    [safeSetState]
  );

  const setData = React.useCallback(
    (data) => {
      safeSetState({ data });
    },
    [safeSetState]
  );

  const setError = React.useCallback(
    (error) => {
      safeSetState({ error });
    },
    [safeSetState]
  );

  return {
    data,
    status,
    error,

    setData,
    setError,
    run,

    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isSuccess: status === 'resolved',
    isError: status === 'rejected',
  };
}

export { useAsync };
