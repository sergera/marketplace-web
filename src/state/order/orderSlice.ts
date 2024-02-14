import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getOrderRange, updateDisplay } from './thunks';

import { OrderSlice, Order } from './orderSlice.types';

import { PAGE_SIZE_TYPES, MONITOR_LIMIT_TYPES, ORDER_SORT_TYPES, ORDER_STATUS_PRIORITY } from '../../constants';

export const initialState: OrderSlice = {
	pageDisplayList: [],
	sort: ORDER_SORT_TYPES.newest,
	page: 1,
	pageSize: PAGE_SIZE_TYPES.twelve,
	nextPageExists: false,
	previousPageExists: false,
	monitorDisplayList: [],
	monitorLimit: MONITOR_LIMIT_TYPES.twentyFive,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		nextPage(state: OrderSlice) {
			state.page = state.page + 1;
		},
		previousPage(state: OrderSlice) {
			if (state.page > 1) {
				state.page = state.page - 1;
			}
		},
		resetPagination(state: OrderSlice) {
			state.page = 1;
		},
		choosePageSize(state: OrderSlice, action: PayloadAction<number>) {
			const newPageSize = action.payload;
			if (state.page !== 1) {
				const firstOrderNumber = ((state.page - 1) * state.pageSize) + 1;
				state.page = Math.floor(firstOrderNumber / newPageSize) + 1;
			}
			state.pageSize = newPageSize;
		},
		chooseSort(state: OrderSlice, action: PayloadAction<string>) {
			state.page = 1;
			state.sort = action.payload;
		},
		chooseMonitorLimit(state: OrderSlice, action: PayloadAction<number>) {
			let newLimit = action.payload;
			if (state.monitorDisplayList.length > newLimit) {
				state.monitorDisplayList = state.monitorDisplayList.slice(0, newLimit + 1);
			}
			state.monitorLimit = newLimit;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getOrderRange.fulfilled, (state: OrderSlice, action: PayloadAction<Order[]>) => {
			const orders = action.payload;
			const ordersNumber = orders.length;
			if (ordersNumber === state.pageSize + 1) {
				state.nextPageExists = true;
				state.pageDisplayList = orders.slice(0, -1);
			} else {
				state.nextPageExists = false;
				state.pageDisplayList = orders;
			}

			if (state.page > 1) {
				state.previousPageExists = true;
			} else {
				state.previousPageExists = false;
			}
		});
		builder.addCase(updateDisplay.fulfilled, (state: OrderSlice, action: PayloadAction<Order[]>) => {
			let orders = action.payload;
			for (let i = 0; i < orders.length; i++) {
				/* update monitor */
				if (state.monitorDisplayList.length === 0) {
					/* if list is empty, insert it */
					state.monitorDisplayList.push(orders[i]);
					continue;
				}

				let idx = state.monitorDisplayList.findIndex((order) => order.orderId === orders[i].orderId);
				if (idx !== -1 && ORDER_STATUS_PRIORITY[orders[i].status] > ORDER_STATUS_PRIORITY[state.monitorDisplayList[idx].status]) {
					/* if order is in list, replace it */
					state.monitorDisplayList[idx].status = orders[i].status;
					continue;
				}

				/* if it's not, stick in the middle and sort the list */
				state.monitorDisplayList.splice(Math.floor(state.monitorDisplayList.length / 2), 0, orders[i]);
				state.monitorDisplayList.sort((a, b) => Number(a.orderId) > Number(b.orderId) ? -1 : 1);
				if (state.monitorDisplayList.length > state.monitorLimit) {
					/* make sure the list has the correct size */
					state.monitorDisplayList.pop();
				}
			}

			for (let i = 0; i < orders.length; i++) {
				/* update page */
				let idx = state.pageDisplayList.findIndex((order) => order.orderId === orders[i].orderId);
				if (idx !== -1 && ORDER_STATUS_PRIORITY[orders[i].status] > ORDER_STATUS_PRIORITY[state.pageDisplayList[idx].status]) {
					/* if order is in list, replace it */
					state.pageDisplayList[idx].status = orders[i].status;
					continue;
				}
			}
		});
	}
});

export const {
	nextPage,
	previousPage,
	resetPagination,
	choosePageSize,
	chooseSort,
	chooseMonitorLimit,
} = orderSlice.actions;


export const orderReducer = orderSlice.reducer;
