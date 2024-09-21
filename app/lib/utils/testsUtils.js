// testUtils.js
export const loggingMiddleware = store => next => action => {
  const { component, timestamp } = action.meta || {};

  console.log('Dispatching:', action);
  if (component) {
    console.log(`Action triggered from component: ${component}`);
  }
  if (timestamp) {
    console.log(`Timestamp: ${new Date(timestamp).toLocaleString()}`);
  }
  console.log('Previous State:', JSON.stringify(store.getState()));
  
  const result = next(action);
  
  console.log('Next State:', JSON.stringify(store.getState()));
  return result;
};
