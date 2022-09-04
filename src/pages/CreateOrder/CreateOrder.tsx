import { useState } from "react";

import { MainDishInput } from "../../components/MainDishInput";
import { SideDishInput } from "../../components/SideDishInput";
import { DrinkInput } from "../../components/DrinkInput";
import { Button } from "../../components/UI/Button";
import { TextInputWithRules } from "../../components/UI/TextInputWithRules";

import { emptyMainDish } from "../../components/MainDishInput";
import { emptySideDish } from "../../components/SideDishInput";
import { emptyDrink } from "../../components/DrinkInput";
import { Log } from "../../logger";
import { backend } from "../../apis";
import { getErrorMessage } from "../../error";
import { isNumeric } from "../../validation/string";

import { store } from "../../state";
import { openModal } from "../../state/modal";
import { openSuccessNotification, openErrorNotification } from "../../state/notification";
import { openErrorToast, openSuccessToast } from "../../state/toast";

import { MainDish } from "../../components/MainDishInput/MainDishInput.types";
import { SideDish } from "../../components/SideDishInput/SideDishInput.types";
import { Drink } from "../../components/DrinkInput/DrinkInput.types";
import { MODAL_TYPES, ORDER_STATUSES } from '../../constants';

export function CreateOrder() {
	let [mainDish, setMainDish] = useState<MainDish>(emptyMainDish());
	let [sideDish, setSideDish] = useState<SideDish>(emptySideDish());
	let [drink, setDrink] = useState<Drink>(emptyDrink());
	let [rapidFireNumber, setRapidFireNumber] = useState<string>("1");
	let [isValidRapidFireNumber, setIsValidRapidFireNumber] = useState<boolean>(true);
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

	let getRapidFireNumber = (numStr: string) => {
		let isValid = isNumeric(numStr) && numStr[0] !== "0";
		setIsValidRapidFireNumber(isValid)
		setRapidFireNumber(numStr)
	}

	let submitRapidFire = () => {
		if(isValidRapidFireNumber) {
			const max = Math.floor(Number(rapidFireNumber));
			if(mainDish.isValid || sideDish.isValid || drink.isValid) {
				let promises = [];
				let count = 0;
				while(count < max) {
					try {
						promises.push(backend.post('/create', {
							price: mainDish.price + sideDish.price + drink.price,
							status: ORDER_STATUSES.unconfirmed,
						}))
						count++;
					} catch (err) {
						Log.error({
							description: "error creating order",
							msg: getErrorMessage(err),
						})
					}
				}
				Promise.allSettled(promises).then((responses) => {
					if(responses.length === max) {
						store.dispatch(openSuccessToast("rapid fire completed successfully!"));
					} else {
						store.dispatch(openErrorToast("not all rapid fire responses acquired"));	
					}
				})
			}	else {
				store.dispatch(openModal(MODAL_TYPES.incompleteForm));
			}
		} else {
			store.dispatch(openErrorToast("please fill the number correctly"))
		}
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
					styleClass="btn-primary"
					handleClick={submitOrder}
				/>

				<TextInputWithRules
					name="№ of requests"
					placeholder="insert number of requests"
					value={String(rapidFireNumber)}
					isValid={isValidRapidFireNumber}
					rules={["numeric chars only","no leading zeros"]}
					handleChange={getRapidFireNumber}
				/>
				<Button
					name="rapid fire!"
					styleClass="btn-warning"
					handleClick={submitRapidFire}
				/>
			</div>
    </div>
  );
};
