import { createAsyncThunk } from '@reduxjs/toolkit';

import { backend } from '../../apis';

import { Order, BackendOrder, OrderRange } from './orderSlice.types';
import { RootState } from '..';

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
		dispatch(getOrderRange({start: range.start, end: range.end, oldestFirst: false}));
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

const getRange = (page: number, pageSize: number): OrderRange => {
	if(page === 1) {
		return {start: 1, end: pageSize + 1};
	} else {
		return {start: (pageSize * (page - 1)) + 1, end: ((pageSize * (page - 1)) + 1) + pageSize};
	}
};

const convertOrderList = (backendOrders: BackendOrder[]): Order[] => {
	return backendOrders.map((order: BackendOrder): Order => {
		return {
			orderId: order.id,
			price: formatPriceString(order.price),
			status: order.status,
			date: order.date.substring(0,10),
			time: order.date.substring(11,19),
		}
	});
};

const formatPriceString = (price: string): string => {
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
