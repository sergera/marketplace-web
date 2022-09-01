import { Button } from '../../../UI/Button';

import { ModalErrorProps } from './ModalError.types';

export function ModalError({
	close
}:ModalErrorProps) {

	const title = "Oops!";
	const content = "Something went wrong, please try again";

  return (
		<div className="modal">
			<div className="modal__content">
				<h1 className="modal__text">{title}</h1>
				<p className="modal__text">{content}</p>
			</div>
			<Button 
				styleClass="btn-foreground-outline" 
				name={"ok"} 
				handleClick={() => close()}
				shouldFocusOnRender={true}
			/>
		</div>
  );
};
