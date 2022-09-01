import { OrderCardProps } from "./OrderCard.types";

import { ORDER_STATUSES } from '../../constants';

export function OrderCard({
	order,
}: OrderCardProps) {

	const unconfirmed = order.status === ORDER_STATUSES.unconfirmed;
	const inProgress = order.status === ORDER_STATUSES.inProgress;
	const ready = order.status === ORDER_STATUSES.ready;

	return (
		<div className="order-card">
			<div style={{gridTemplateColumns:"1fr"}} className="order-card__header">
				{unconfirmed &&
				<div className={"order-card__unconfirmed order-card__status"}>
						<p>For Sale!</p>
				</div>
				}
				{inProgress &&
				<div className={"order-card__in-progress order-card__status"}>
						<p>Owned</p>
				</div>
				}
				{ready &&
				<div className={"order-card__ready order-card__status"}>
						<p>For Sale!</p>
				</div>
				}
			</div>
			<div className="order-card__body">
			<div className="order-card__id">
					{"#" + order.orderId}
			</div>
			<div className="order-card__created">
				{"Created: " + order.date + " " + order.time}
			</div>
				<div className="order-card__price">
					<div className="order-card__price-value">
						{order.price + " $"}
					</div>
				</div>
			</div>
		</div>
	);
};
