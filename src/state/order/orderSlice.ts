import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getOrderRange, updateDisplay } from './thunks';

import { OrderSlice, Order } from './orderSlice.types';

import { PAGE_SIZE_TYPES, ORDER_SORT_TYPES, ORDER_STATUS_PRIORITY } from '../../constants';

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
		builder.addCase(updateDisplay.fulfilled, (state:OrderSlice, action:PayloadAction<Order[]>) => {
			let orders = action.payload;
			switch (state.sort) {
				case ORDER_SORT_TYPES.newest:
					for(let i = 0; i < orders.length; i++) {
						if(Number(orders[i].orderId) < Number(state.displayList[state.displayList.length-1])) {
							/* if it's an old order, ignore it */
							continue;
						}
						if(Number(orders[i].orderId) > Number(state.displayList[0].orderId)) {
							/* if it's a new order, stick it on top */
							state.displayList.unshift(orders[i]);
							state.displayList.pop();
							continue;
						}
						let idx = state.displayList.findIndex((order) => order.orderId === orders[i].orderId);
						if(idx !== -1 && ORDER_STATUS_PRIORITY[orders[i].status] > ORDER_STATUS_PRIORITY[state.displayList[idx].status]) {
							/* if order is in list, replace it */
							state.displayList[idx].status = orders[i].status;
							continue;
						}

						/* if it's in the middle, stick in the middle and sort the list */
						state.displayList.splice(Math.floor(state.displayList.length/2),0,orders[i]);
						state.displayList.sort((a,b) => Number(a.orderId) > Number(b.orderId) ? -1 : 1);
						if(state.displayList.length > state.pageSize) {
							/* make sure the list has the correct size */
							state.displayList.pop();
						}
					}
					break;
				case ORDER_SORT_TYPES.oldest:
					for(let i = 0; i < orders.length; i++) {
						let idx = state.displayList.findIndex((order) => order.orderId === orders[i].orderId);
						if(idx !== -1 && ORDER_STATUS_PRIORITY[orders[i].status] > ORDER_STATUS_PRIORITY[state.displayList[idx].status]) {
							/* if order is in list, replace it */
							state.displayList[idx].status = orders[i].status;
							continue;
						}
					}					
					break;
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
