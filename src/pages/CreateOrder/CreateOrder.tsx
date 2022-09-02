import { useState } from "react";

import { Button } from "../../components/UI/Button";
import { MainDishInput } from "../../components/MainDishInput";
import { SideDishInput } from "../../components/SideDishInput";
import { DrinkInput } from "../../components/DrinkInput";

import { emptyMainDish } from "../../components/MainDishInput";
import { emptySideDish } from "../../components/SideDishInput";
import { emptyDrink } from "../../components/DrinkInput";
import { Log } from "../../logger";
import { backend } from "../../apis";
import { getErrorMessage } from "../../error";

import { store } from "../../state";
import { getOrders } from "../../state/order";
import { openModal } from "../../state/modal";

import { MainDish } from "../../components/MainDishInput/MainDishInput.types";
import { SideDish } from "../../components/SideDishInput/SideDishInput.types";
import { Drink } from "../../components/DrinkInput/DrinkInput.types";
import { MODAL_TYPES, ORDER_STATUSES } from '../../constants';
import { openSuccessNotification, openErrorNotification } from "../../state/notification";

export function CreateOrder() {
	let [mainDish, setMainDish] = useState<MainDish>(emptyMainDish());
	let [sideDish, setSideDish] = useState<SideDish>(emptySideDish());
	let [drink, setDrink] = useState<Drink>(emptyDrink());
	let [shouldResetInputFields, setShouldResetInputFields] = useState(false);

	let getMainDish = (mainDish: MainDish) => {
		setMainDish(mainDish);
	}

	let getSideDish = (sideDish: SideDish) => {
		setSideDish(sideDish);
	}

	let getDrink = (drink: Drink) => {
		setDrink(drink);
	}

	let resetFields = () => {
		setShouldResetInputFields(!shouldResetInputFields);
		setMainDish(emptyMainDish());
		setSideDish(emptySideDish());
		setDrink(emptyDrink());
	}

	let submitOrder = async () => {
		if(mainDish.isValid || sideDish.isValid || drink.isValid) {
			try {
				let res = await backend.post('/create', {
					price: mainDish.price + sideDish.price + drink.price,
					status: ORDER_STATUSES.unconfirmed,
				})
				store.dispatch(openSuccessNotification(`Successfully created order #${res.data.id}`));
				store.dispatch(getOrders());
				resetFields();
			} catch (err) {
				Log.error({
					description: "error creating order",
					msg: getErrorMessage(err),
				})
				store.dispatch(openErrorNotification(`Error creating order: ${getErrorMessage(err)}`))
			}
		} else {
			store.dispatch(openModal(MODAL_TYPES.incompleteForm));
		}
	}

  return (
    <div className="create-order">
			<div className="create-order__content">
				<MainDishInput
					handleChange={getMainDish}
					isRequired={false}
					shouldResetField={shouldResetInputFields}
				/>

				<SideDishInput
					handleChange={getSideDish}
					isRequired={false}
					shouldResetField={shouldResetInputFields}
				/>

				<DrinkInput 
					handleChange={getDrink}
					isRequired={false}
					shouldResetField={shouldResetInputFields}
				/>

				<div className="create-order__total">
					{`total: $${mainDish.price + sideDish.price + drink.price}`}
				</div>

				<Button
					name="submit"
					handleClick={submitOrder}
				/>
			</div>
    </div>
  );
};
