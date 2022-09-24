import { configureStore } from '@reduxjs/toolkit'
import crudReducer from '../reducers/crudReducer';

export const store = configureStore({
    reducer: {
        crud: crudReducer
    }
})