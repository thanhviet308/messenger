import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { combineReducers } from 'redux';
import { messengerReducer } from './reducers/messengerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    messenger: messengerReducer,
    // Thêm các reducer khác của bạn vào đây
})

const store = configureStore({
    reducer: rootReducer, // Thêm reducers của bạn vào đây
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    //   devTools: process.env.NODE_ENV !== 'production', // Bật Redux DevTools trong môi trường dev
});

export default store;
