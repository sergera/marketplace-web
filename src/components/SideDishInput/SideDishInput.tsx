import { useState, useEffect } from 'react';

import { RadioInput } from '../UI/RadioInput';

import { SideDishInputProps } from './SideDishInput.types';
import { RadioInputOption, emptyRadioInputOption } from '../UI/RadioInput';

import { SIDE_DISHES } from './SideDishInput.constants';
import { SIDE_DISH_TYPES } from '../../constants';

export function emptySideDish() {
	return {
		name: "",
		price: 0,
		isValid: false,
	};
};

export function SideDishInput({
	handleChange,
	isRequired,
	shouldResetField,
}: SideDishInputProps) {
	let [selected, setSelected] = useState<RadioInputOption>(emptyRadioInputOption());

	useEffect(() => {
		setSelected(emptyRadioInputOption());
	}, [shouldResetField])

	const liftSideDish = (value: RadioInputOption) => {
		setSelected(value);
		handleChange(value.data);
	}

	return (
		<RadioInput 
			label={"Side"}
			options={[
				{
					label: "None",
					data: emptySideDish(),
				},
				{
					label: `${SIDE_DISHES[SIDE_DISH_TYPES.frenchFries].name} $${SIDE_DISHES[SIDE_DISH_TYPES.frenchFries].price}`,
					data: SIDE_DISHES[SIDE_DISH_TYPES.frenchFries]
				},
				{
					label: `${SIDE_DISHES[SIDE_DISH_TYPES.onionRings].name} $${SIDE_DISHES[SIDE_DISH_TYPES.onionRings].price}`,
					data: SIDE_DISHES[SIDE_DISH_TYPES.onionRings]
				},
			]}
			value={selected}
			handleChange={liftSideDish}
			isRequired={isRequired}
		/>
	);
};
