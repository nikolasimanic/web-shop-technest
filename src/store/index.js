import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../redux/reducers';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

console.log('Persisted reducer initialized:', persistedReducer);

const store = createStore(persistedReducer);

console.log('Store initialized with state:', store.getState());

const persistor = persistStore(store);

export { store, persistor };

