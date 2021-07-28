import { createStore, combineReducers } from 'redux';
import { User } from '../Types/User';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as Reducers from './reducers';

export type Session = {
  accessToken: string;
  user: User;
}

const persistConfig = {
  key: 'root',
  storage,
}

const reducers = combineReducers(Reducers);
 
const persistedReducer = persistReducer(persistConfig, reducers)


const configureStore = (initialState = undefined) => {
    const store = createStore(persistedReducer, /* initialState, */ (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

    // Enable Webpack hot module replacement for reducers
    module.hot?.accept(reducers as any, () => {
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
    });

    return { store, persistor: persistStore(store) };
};

export default configureStore();