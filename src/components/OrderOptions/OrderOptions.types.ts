export interface OrderOptionsProps {
	handleSelect: Function;
	selectedSort: string;
	chooseSort: Function;
};

export type OrderSelectOption = {
	label: string;
	data: {value: string};
};
