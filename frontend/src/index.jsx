import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import persistantStorage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/lib/integration/react';
import rootReducer from './redux/reducers';
import App from './app/App';
import Loader from './app/Loader';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: persistantStorage,
  stateReconciler: autoMergeLevel2,
};

const persistantReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line import/prefer-default-export
const store = createStore(persistantReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
