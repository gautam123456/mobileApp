import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './common/reducers';
import Introduction from './common/components/Introduction';
import { getItems, getUserDetails } from './common/actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import LoaderImage from './common/components/LoaderImage';


const persistConfig = {
  key: 'v1',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.store = this.configureStore({});
    this.persistore = persistStore(this.store);
  }

  configureStore(initialState) {
    const enhancer = compose(applyMiddleware(thunkMiddleware));
    return createStore(persistedReducer, initialState, enhancer);
  }

  componentWillMount() {
    this.store.dispatch(getItems());
    this.store.dispatch(getUserDetails());
    console.disableYellowBox = true;
  }

  render() {

    return (
      <Provider store={this.store}>
        <PersistGate loading={<LoaderImage />} persistor={this.persistore}>
          <Introduction />
        </PersistGate>
      </Provider>
    )
  }
}