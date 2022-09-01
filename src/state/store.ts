import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { orderReducer } from './order';
import { modalReducer } from './modal';
import { notificationReducer } from './notification';
import { toastReducer } from './toast';

export const combinedReducer = combineReducers({
	order: orderReducer,
	modal: modalReducer,
	notification: notificationReducer,
	toast: toastReducer,
});

export const store = configureStore({
	reducer: combinedReducer
});

export const useAppDispatch = () => useDispatch<Dispatch>();

export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;
