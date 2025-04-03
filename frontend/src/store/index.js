import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer
})

const store = configureStore({
    reducer: rootReducer, // Thêm reducers của bạn vào đây
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    //   devTools: process.env.NODE_ENV !== 'production', // Bật Redux DevTools trong môi trường dev
});

export default store;
