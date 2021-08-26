import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers } from 'redux'
import { configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import AuthReducer from './Auth'
import DataReducer from './UserData'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth','dataUser']
};

const reducer = combineReducers({
    auth:AuthReducer,
    dataUser:DataReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)
export const store = configureStore({
    reducer:persistedReducer,
    middleware: [thunk],
})

export const persister = persistStore(store);