import { createStore, combineReducers } from 'redux';
import { User } from '../Types/User';
import * as Reducers from './reducers';

export type Session = {
  accessToken: string;
  user: User;
}

const reducers = combineReducers(Reducers);

const configureStore = (initialState = undefined) => {
    const store = createStore(reducers, initialState);

    // Enable Webpack hot module replacement for reducers
    module.hot?.accept(reducers as any, () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
    });

    return store;
};

export default configureStore();