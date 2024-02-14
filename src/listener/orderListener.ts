import { getBackendURL } from "../env";

import { store } from "../state";
import { updateDisplay } from "../state/order";

const backendURL = getBackendURL();
var ws: WebSocket;

export const listenForOrders = () => {
	ws = new WebSocket(`ws://${backendURL}/notify-orders`)
	ws.onmessage = function (event) {
		const backendOrder = JSON.parse(event.data);
		store.dispatch(updateDisplay([backendOrder]));
	}
};
