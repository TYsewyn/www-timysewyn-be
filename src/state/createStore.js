import { compose, createStore } from 'redux';
import rootReducer from './reducers';
import persistState from 'redux-localstorage';

export default preloadedState => {
  const enhancer = typeof window !== `undefined` ? compose(persistState(null, { key: 'state' })) : undefined;
  return createStore(rootReducer, preloadedState, enhancer);
};
