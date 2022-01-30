
import React, { Component } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, sagaMiddleware, rootSaga } from './src/redux';
import Home from './src/container/home'
import { SafeAreaView, Text, View } from 'react-native';


export default class App extends Component {
  
  render(): React.ReactNode {
  return (
      <Provider store ={store}>
        <PersistGate persistor={persistor}>
          <Home/>
        </PersistGate>
      </Provider>
    )      
  }
        
  
};

