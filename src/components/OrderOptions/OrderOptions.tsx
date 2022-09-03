import { connect } from 'react-redux';

import { Select } from '../UI/Select';

import { chooseSort } from '../../state/order';

import { ORDER_SORT_TYPES } from '../../constants';

import { OrderOptionsProps, OrderSelectOption } from './OrderOptions.types';
import { RootState, Dispatch } from '../../state';

const SORT_OPTIONS = {
	newest: {label: "newest", data: {value: ORDER_SORT_TYPES.newest}},
	oldest: {label: "oldest", data: {value: ORDER_SORT_TYPES.oldest}},
}

const SORT_TYPE_TO_OPTION = {
	[ORDER_SORT_TYPES.newest]:	SORT_OPTIONS.newest,
	[ORDER_SORT_TYPES.oldest]: SORT_OPTIONS.oldest,
}

export function OrderOptions({
	handleSelect,
	selectedSort,
	chooseSort,
}: OrderOptionsProps) {

	let getSelectOption = (option: OrderSelectOption) => {
		chooseSort(option.data.value);
		handleSelect();
	};

  return (
    <div className="order-options">
			<div className="order-options__option">
				<Select 
					label="sort by:"
					selected={SORT_TYPE_TO_OPTION[selectedSort]}
					handleChange={getSelectOption}
					options={[
						SORT_OPTIONS.newest,
						SORT_OPTIONS.oldest
					]}
				/>
			</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
	return {
		selectedSort: state.order.sort,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
    chooseSort: (sortType: string) => dispatch(chooseSort(sortType)),
  };
};

export const ConnectedOrderOptions = connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderOptions);
