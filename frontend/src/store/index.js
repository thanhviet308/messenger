import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {}, // Thêm reducers của bạn vào đây
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    //   devTools: process.env.NODE_ENV !== 'production', // Bật Redux DevTools trong môi trường dev
});

export default store;
