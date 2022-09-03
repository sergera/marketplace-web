export const ORDER_STATUSES = {
	unconfirmed: "unconfirmed",
	inProgress: "in_progress",
	ready: "ready",
	inTransit: "in_transit",
	delivered: "delivered",
};

export const ORDER_STATUS_PRIORITY = {
	[ORDER_STATUSES.unconfirmed]: 0,
	[ORDER_STATUSES.inProgress]: 1,
	[ORDER_STATUSES.ready]: 2,
	[ORDER_STATUSES.inTransit]: 3,
	[ORDER_STATUSES.delivered]: 4,
};
