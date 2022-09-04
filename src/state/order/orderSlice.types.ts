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
	pageDisplayList: Order[];
	sort: string;
	page: number;
	pageSize: number;
	nextPageExists: boolean;
	previousPageExists: boolean;
	monitorDisplayList: Order[];
	monitorLimit: number;
};

export interface OrderRange {
	start: number;
	end: number;
};
