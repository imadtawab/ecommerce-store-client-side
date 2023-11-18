import { configureStore } from '@reduxjs/toolkit' 
import productsReducer from './productsSlice';
import usersReducer from './usersSlice';
import orderReducer from './orderSlice';
import client_productsReducer from './client_productsSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        users: usersReducer,
        orders: orderReducer,
        client_products: client_productsReducer
    }
}) ; 
export default store ;
