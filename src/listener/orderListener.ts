import { getBackendURL } from "../env";

import { store } from "../state";
import { updateDisplayedOrder } from "../state/order";
import { convertOrder } from "../state/order";


const backendURL = getBackendURL();
var ws: WebSocket;

export const listenForOrders = () => {
	ws = new WebSocket(`ws://${backendURL}/notify-orders`)
	ws.onmessage = function (event) {
		const backendOrder = JSON.parse(event.data);
		const order = convertOrder(backendOrder);
		store.dispatch(updateDisplayedOrder(order))
	}
};
