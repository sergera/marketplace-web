import { useEffect } from 'react';
import { connect } from 'react-redux';

import { ConnectedOrderOptions as OrderOptions } from '../../components/OrderOptions';
import { ConnectedPage as Page } from '../../components/Page';
import { OrderCard } from '../../components/OrderCard';

import { getOrders } from '../../state/order';

import { OrdersProps } from './Orders.types';
import { RootState, Dispatch } from '../../state';

export function Orders({
	getOrders,
	pageDisplayList,
}: OrdersProps) {

	useEffect(() => {
		getOrders();
	}, [getOrders]);

  return (
    <div className="orders">
			<div className="orders__content">
				<OrderOptions
					handleSelect={getOrders}
				/>
				<Page
					handleClickNext={getOrders}
					handleClickPrevious={getOrders}
					handleSelectSize={getOrders}
				>
					{pageDisplayList.map((order) => {
						return (
							<OrderCard order={order} key={order.orderId} />
						);
					})}
				</Page>
			</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
	return {
		pageDisplayList: state.order.pageDisplayList,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
    getOrders: () => dispatch(getOrders()),
  };
};

export const ConnectedOrders = connect(
	mapStateToProps,
	mapDispatchToProps
)(Orders);
