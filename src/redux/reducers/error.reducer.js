const errorReducer = (state = {}, action) => {
  const {type, error} = action;
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  // not a *_REQUEST / *_FAILURE actions, so we ignore them
  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;
  return {
    ...state,
    // Store errorMessage
    // e.g. stores errorMessage when receiving GET_TODOS_FAILURE
    //      else clear errorMessage when receiving GET_TODOS_REQUEST
    [requestName]: requestState === 'FAILURE' ? error.message : '',
  };
};

export default errorReducer;
