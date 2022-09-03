import { createAsyncThunk } from '@reduxjs/toolkit';

import { backend } from '../../apis';

import { Order, BackendOrder, OrderRange } from './orderSlice.types';
import { RootState } from '..';
import { ORDER_SORT_TYPES } from '../../constants';

export const updateDisplay = createAsyncThunk<
	Order[], // return type
	BackendOrder[], // first argument type
	{ state: RootState }
>(
	"order/updateDisplay",
	async(backendOrders, thunkAPI) => {
		let { getState, dispatch } = thunkAPI;
		if(getState().order.displayList.length === 0) await dispatch(getOrders());
		return convertOrderList(backendOrders);
	}
);

export const getOrders = createAsyncThunk<
	void, // return type
	void, // first argument type
	{ state: RootState }
>(
	"order/getOrders",
	async(_,thunkAPI) => {
		let { getState, dispatch } = thunkAPI;
		const orderState = getState().order;
		const range = getRange(orderState.page, orderState.pageSize);
		switch (orderState.sort) {
			case ORDER_SORT_TYPES.newest:
				dispatch(getOrderRange({start: range.start, end: range.end, oldestFirst: false}));
				break;
			case ORDER_SORT_TYPES.oldest:
				dispatch(getOrderRange({start: range.start, end: range.end, oldestFirst: true}));
				break;
			default:
				dispatch(getOrderRange({start: range.start, end: range.end, oldestFirst: false}));
		}
	}
);

export const getOrderRange = createAsyncThunk<
	Order[], // return type
	{ start: number, end: number, oldestFirst: boolean }, // first argument type
	{ state: RootState }
>(
	"order/orderRange",
	async(range,_) => {
		let res = await backend.get('/order-range', {
			params: {
				start: range.start,
				end: range.end,
				"oldest-first": range.oldestFirst,
			}
		});

		return convertOrderList(res.data);
	}
);

export const getRange = (page: number, pageSize: number): OrderRange => {
	if(page === 1) {
		return {start: 1, end: pageSize + 1};
	} else {
		return {start: (pageSize * (page - 1)) + 1, end: ((pageSize * (page - 1)) + 1) + pageSize};
	}
};

export const convertOrder = (backendOrder: BackendOrder): Order => {
	return {
		orderId: backendOrder.id,
		price: formatPriceString(backendOrder.price),
		status: backendOrder.status,
		date: backendOrder.date.substring(0,10),
		time: backendOrder.date.substring(11,19),
	}
};

export const convertOrderList = (backendOrders: BackendOrder[]): Order[] => {
	return backendOrders.map((order: BackendOrder): Order => {
		return convertOrder(order);
	});
};

export const formatPriceString = (price: string): string => {
	for (var i = price.length - 1; i >= 0; i--) {
		if(price[i] === "0") {
			price = price.slice(0, -1);
		} else if(price[i] === ".") {
			price = price.slice(0, -1);
			break;
		} else {
			break;
		}
	}
	return price;
};
