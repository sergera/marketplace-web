export interface Order {
	orderId: string;
	price: string;
	status: string;
	date: string;
	time: string;
};

export interface BackendOrder {
	id: string;
	price: string;
	status: string;
	date: string;
}

export interface OrderSlice {
	displayList: Order[];
	page: number;
	pageSize: number;
	nextPageExists: boolean;
	previousPageExists: boolean;
};

export interface OrderRange {
	start: number;
	end: number;
};
