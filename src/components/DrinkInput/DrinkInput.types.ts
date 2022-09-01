export interface DrinkInputProps {
	handleChange: Function;
	isRequired: boolean;
	shouldResetField: boolean;
};

export interface Drink {
	name: string;
	price: number;
	isValid: boolean;
};
