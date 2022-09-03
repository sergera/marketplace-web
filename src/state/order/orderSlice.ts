import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getOrderRange } from './thunks';

import { OrderSlice, Order } from './orderSlice.types';

import { PAGE_SIZE_TYPES } from '../../constants';

export const initialState: OrderSlice = {
	displayList: [],
	sort: ORDER_SORT_TYPES.newest,
	page: 1,
	pageSize: PAGE_SIZE_TYPES.twelve,
	nextPageExists: false,
	previousPageExists: false,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		nextPage(state:OrderSlice) {
			state.page = state.page + 1;
		},
		previousPage(state:OrderSlice) {
			if(state.page > 1) {
				state.page = state.page - 1;
			}
		},
		resetPagination(state:OrderSlice) {
			state.page = 1;
		},
		choosePageSize(state:OrderSlice, action:PayloadAction<number>) {
			const newPageSize = action.payload;
			if(state.page !== 1) {
				const firstStarNumber = ((state.page - 1) * state.pageSize) + 1;
				state.page = Math.floor(firstStarNumber/newPageSize) + 1;
			}
			state.pageSize = newPageSize;
		},
		chooseSort(state:OrderSlice, action:PayloadAction<string>) {
			state.page = 1;
			state.sort = action.payload;
		},
		updateDisplayedOrder(state:OrderSlice, action:PayloadAction<Order>) {
			let incomingOrder = action.payload;
			let indexOfOrder = state.displayList.findIndex((o) => o.orderId === incomingOrder.orderId)
			if(indexOfOrder !== -1) {
				/* if order is displayed */
				state.displayList[indexOfOrder].status = incomingOrder.status
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getOrderRange.fulfilled, (state:OrderSlice, action:PayloadAction<Order[]>) => {
			const stars = action.payload;
			const starsNumber = stars.length;
			if(starsNumber === state.pageSize + 1) {
				state.nextPageExists = true;
				state.displayList = stars.slice(0,-1);
			} else {
				state.nextPageExists = false;
				state.displayList = stars;
			}

			if(state.page > 1) {
				state.previousPageExists = true;
			} else {
				state.previousPageExists = false;
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
	updateDisplayedOrder,
} = orderSlice.actions;


export const orderReducer = orderSlice.reducer;
