import { Order } from "../../state/order/orderSlice.types";

export interface OrdersProps {
	getOrders: Function;
	displayList: Order[];
};
