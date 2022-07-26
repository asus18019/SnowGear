import { addHoursToDatetime, extractDataTime } from './addHoursToDatetimeFromFlatpickr';
import { getCurrentCart, addInCart, removeFromCart, changeDateStart, changeDuration } from './cartUtils';
import { sizeParser } from './sizeParser';
import {
	initialFilters,
	isAnyFilter,
	isCategoryFiltering,
	isTitleFiltering,
	isPriceFiltering,
	isSizeFiltering,
	filterBySize,
	filterByPrice,
	filterByTitle,
	filterByCategory,
} from './filters';
import { flatpickrConfig } from './flatpickrConfig';
import { handleAgeInput } from './inputHandlers';
import { ModalTypes } from './modalTypes';
import { validateBodyObject, validateErrorsObject, makeFieldsToUpdate } from './validateData';

export {
	addHoursToDatetime,
	extractDataTime,
	getCurrentCart,
	addInCart,
	removeFromCart,
	changeDateStart,
	changeDuration,
	sizeParser,
	initialFilters,
	isAnyFilter,
	isCategoryFiltering,
	isTitleFiltering,
	isPriceFiltering,
	isSizeFiltering,
	filterBySize,
	filterByPrice,
	filterByTitle,
	filterByCategory,
	flatpickrConfig,
	handleAgeInput,
	ModalTypes,
	validateBodyObject,
	validateErrorsObject,
	makeFieldsToUpdate,
};