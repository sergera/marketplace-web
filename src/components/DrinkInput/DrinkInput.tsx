import { useState, useEffect } from 'react';

import { RadioInput, emptyRadioInputOption } from '../UI/RadioInput';

import { DrinkInputProps } from './DrinkInput.types';
import { RadioInputOption } from '../UI/RadioInput';

import { DRINKS } from './DrinkInput.constants';
import { DRINK_TYPES } from '../../constants';

export function emptyDrink() {
	return {
		name: "",
		price: 0,
		isValid: false,
	};
};

export function DrinkInput({
	handleChange,
	isRequired,
	shouldResetField,
}: DrinkInputProps) {
	let [selected, setSelected] = useState<RadioInputOption>(emptyRadioInputOption());

	useEffect(() => {
		setSelected(emptyRadioInputOption());
	}, [shouldResetField])


	const liftDrink = (value: RadioInputOption) => {
		setSelected(value);
		handleChange(value.data);
	}

	return (
		<RadioInput 
			label={"Drink"}
			options={[
				{
					label: "None",
					data: emptyDrink(),
				},
				{
					label: `${DRINKS[DRINK_TYPES.soda].name} $${DRINKS[DRINK_TYPES.soda].price}`,
					data: DRINKS[DRINK_TYPES.soda]
				},
				{
					label: `${DRINKS[DRINK_TYPES.juice].name} $${DRINKS[DRINK_TYPES.juice].price}`,
					data: DRINKS[DRINK_TYPES.juice]
				},
			]}
			value={selected}
			handleChange={liftDrink}
			isRequired={isRequired}
		/>
	);
};
