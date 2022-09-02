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
					<div className="order-card__status-value">
						<p>unconfirmed</p>
					</div>
				</div>
				}
				{inProgress &&
				<div className={"order-card__in-progress order-card__status"}>
					<div className="order-card__status-value">
						<p>in progress</p>
					</div>
				</div>
				}
				{ready &&
				<div className={"order-card__ready order-card__status"}>
					<div className="order-card__status-value">
						<p>ready</p>
					</div>
				</div>
				}
				{inTransit &&
				<div className={"order-card__in-transit order-card__status"}>
					<div className="order-card__status-value">
						<p>in transit</p>
					</div>
				</div>
				}
				{delivered &&
				<div className={"order-card__delivered order-card__status"}>
						<p>delivered</p>
				</div>
				}
			</div>
			<div className="order-card__id">
				<div className="order-card__id-value">
					{"#" + order.orderId}
				</div>
			</div>
			<div className="order-card__price">
				<div className="order-card__price-value">
					{"$"+order.price}
				</div>
			</div>
			<div className="order-card__date">
				<div className="order-card__date-value">
					{order.date}
				</div>
			</div>
			<div className="order-card__time">
				<div className="order-card__time-value">
					{order.time}
				</div>
			</div>
		</div>
	);
};
