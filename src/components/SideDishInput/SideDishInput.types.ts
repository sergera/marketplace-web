export interface SideDishInputProps {
	handleChange: Function;
	isRequired: boolean;
	shouldResetField: boolean;
};

export interface SideDish {
	name: string;
	price: number;
	isValid: boolean;
};
