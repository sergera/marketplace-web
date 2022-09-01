import { emptyRadioInputOption, RadioInput } from '../UI/RadioInput';

import { MainDishInputProps } from './MainDishInput.types';
import { RadioInputOption } from '../UI/RadioInput';

import { MAIN_DISHES } from './MainDishInput.constants';
import { MAIN_DISH_TYPES } from '../../constants';
import { useEffect, useState } from 'react';

export function emptyMainDish() {
	return {
		name: "",
		price: 0,
		isValid: false,
	};
};

export function MainDishInput({
	handleChange,
	isRequired,
	shouldResetField,
}: MainDishInputProps) {
	let [selected, setSelected] = useState<RadioInputOption>(emptyRadioInputOption());

	useEffect(() => {
		setSelected(emptyRadioInputOption());
	}, [shouldResetField])

	const liftMainDish = (value: RadioInputOption) => {
		setSelected(value);
		handleChange(value.data);
	}

	return (
		<RadioInput 
			label={"Main"}
			options={[
				{
					label: "None",
					data: emptyMainDish(),
				},
				{
					label: `${MAIN_DISHES[MAIN_DISH_TYPES.meatBurger].name} $${MAIN_DISHES[MAIN_DISH_TYPES.meatBurger].price}`,
					data: MAIN_DISHES[MAIN_DISH_TYPES.meatBurger]
				},
				{
					label: `${MAIN_DISHES[MAIN_DISH_TYPES.chickenBurger].name} $${MAIN_DISHES[MAIN_DISH_TYPES.chickenBurger].price}`,
					data: MAIN_DISHES[MAIN_DISH_TYPES.chickenBurger]
				},
				{
					label: `${MAIN_DISHES[MAIN_DISH_TYPES.fishBurger].name} $${MAIN_DISHES[MAIN_DISH_TYPES.fishBurger].price}`,
					data: MAIN_DISHES[MAIN_DISH_TYPES.fishBurger]
				},
				{
					label: `${MAIN_DISHES[MAIN_DISH_TYPES.veggieBurger].name} $${MAIN_DISHES[MAIN_DISH_TYPES.veggieBurger].price}`,
					data: MAIN_DISHES[MAIN_DISH_TYPES.veggieBurger]
				}
			]}
			value={selected}
			handleChange={liftMainDish}
			isRequired={isRequired}
		/>
	);
};
