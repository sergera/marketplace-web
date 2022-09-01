export interface MainDishInputProps {
	handleChange: Function;
	isRequired: boolean;
	shouldResetField: boolean;
};

export interface MainDish {
	name: string;
	price: number;
	isValid: boolean;
};
