const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
      return next(action);
    }
  
    console.log('RDX> type: ', action.type);
    console.log('RDX> payload: ', action.payload);
    console.log('RDX> currentState: ', store.getState());
  
    next(action);
  
    console.log('RDX> next state: ', store.getState());
};

export default loggerMiddleware;