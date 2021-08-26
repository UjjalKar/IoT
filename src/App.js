import 'react-native-gesture-handler';
import React from 'react'
import AppNavigator from './Navigation/AppStack'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { store,persister } from './Redux/Store';




const App = ()=>{
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <AppNavigator/>
      </PersistGate>
    </Provider>
  )
}

export default App;