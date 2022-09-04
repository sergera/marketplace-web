import { connect } from 'react-redux';

import { Select } from '../../components/UI/Select';
import { OrderCard } from '../../components/OrderCard';

import { chooseMonitorLimit } from '../../state/order';

import { MONITOR_LIMIT_TYPES } from '../../constants';

import { LiveMonitorProps, MonitorLimitSelectOption } from './LiveMonitor.types';
import { RootState, Dispatch } from '../../state';

const LIMIT_OPTIONS = {
	twentyFive: {label: "25", data: {value: MONITOR_LIMIT_TYPES.twentyFive}},
	fifty: {label: "50", data: {value: MONITOR_LIMIT_TYPES.fifty}},
	hundred: {label: "100", data: {value: MONITOR_LIMIT_TYPES.hundred}},
};

const LIMIT_TYPE_TO_OPTION = {
	[MONITOR_LIMIT_TYPES.twentyFive]: LIMIT_OPTIONS.twentyFive,
	[MONITOR_LIMIT_TYPES.fifty]: LIMIT_OPTIONS.fifty,
	[MONITOR_LIMIT_TYPES.hundred]: LIMIT_OPTIONS.hundred,
};

export function LiveMonitor({
	monitorDisplayList,
	selectedMonitorLimit,
	chooseMonitorLimit,
}: LiveMonitorProps) {

	const handleSelectLimit = (option: MonitorLimitSelectOption) => {
		chooseMonitorLimit(option.data.value);
	}

  return (
    <div className="live-monitor">
			<div className="live-monitor__content">
			<div className="live-monitor__display-limit">
					<Select 
						label=""
						selected={LIMIT_TYPE_TO_OPTION[selectedMonitorLimit]}
						handleChange={handleSelectLimit}
						options={[
							LIMIT_OPTIONS.twentyFive,
							LIMIT_OPTIONS.fifty,
							LIMIT_OPTIONS.hundred,
						]}
					/>
				</div>
				<div className="live-monitor__order-list">
					{monitorDisplayList.map((order) => {
						return (
							<OrderCard order={order} key={order.orderId} />
						);
					})}
				</div>
			</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
	return {
		monitorDisplayList: state.order.monitorDisplayList,
		selectedMonitorLimit: state.order.monitorLimit,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		chooseMonitorLimit: (limit: number) => dispatch(chooseMonitorLimit(limit)),
  };
};

export const ConnectedLiveMonitor = connect(
	mapStateToProps,
	mapDispatchToProps
)(LiveMonitor);
