import { ModalError } from './form/ModalError';
import { ModalIncompleteForm } from './form/ModalIncompleteForm';

import { MODAL_TYPES } from '../../constants';

import { ModalComponentsMap } from './ModalContainer.types';

export const MODAL_COMPONENTS: ModalComponentsMap = {
	[MODAL_TYPES.error]: ModalError,
	[MODAL_TYPES.incompleteForm]: ModalIncompleteForm,
};
