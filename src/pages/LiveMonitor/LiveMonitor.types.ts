import { Order } from "../../state/order/orderSlice.types";

export interface LiveMonitorProps {
	monitorDisplayList: Order[];
	selectedMonitorLimit: number;
	chooseMonitorLimit: Function;
};

export type MonitorLimitSelectOption = {
	label: string;
	data: {value: number};
};
