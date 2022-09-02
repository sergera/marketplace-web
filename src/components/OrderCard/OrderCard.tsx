import { OrderCardProps } from "./OrderCard.types";

import { ORDER_STATUSES } from '../../constants';

export function OrderCard({
	order,
}: OrderCardProps) {

	const unconfirmed = order.status === ORDER_STATUSES.unconfirmed;
	const inProgress = order.status === ORDER_STATUSES.inProgress;
	const ready = order.status === ORDER_STATUSES.ready;
	const inTransit = order.status === ORDER_STATUSES.inTransit;
	const delivered = order.status === ORDER_STATUSES.delivered;

	return (
		<div className="order-card">
			<div style={{gridTemplateColumns:"1fr"}} className="order-card__header">
				{unconfirmed &&
				<div className={"order-card__unconfirmed order-card__status"}>
						<p>unconfirmed</p>
				</div>
				}
				{inProgress &&
				<div className={"order-card__in-progress order-card__status"}>
						<p>in progress</p>
				</div>
				}
				{ready &&
				<div className={"order-card__ready order-card__status"}>
						<p>ready</p>
				</div>
				}
				{inTransit &&
				<div className={"order-card__in-transit order-card__status"}>
						<p>in transit</p>
				</div>
				}
				{delivered &&
				<div className={"order-card__delivered order-card__status"}>
						<p>delivered</p>
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
						{"$"+order.price}
					</div>
				</div>
			</div>
		</div>
	);
};
