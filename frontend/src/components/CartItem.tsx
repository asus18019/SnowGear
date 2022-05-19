import React, { FC, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Link } from 'react-location';
// @ts-ignore
import styles from './CartItem.module.css';
// @ts-ignore
import test1 from '../assets/test1.jpg'; // Todo fix import
// @ts-ignore
import cancel from '../assets/cancel-item.png'; // Todo fix import
import SetPrice from './UI/SetPrice';
import { flatpickrConfig } from '../utils/flatpickrConfig';
import { addHoursToDatetime } from '../utils/addHoursToDatetimeFromFlatpickr';
import { ICartItem } from '../models/ICartItem';
import { addInCart, changeDateStart, changeDuration, removeFromCart } from '../utils/cartUtils';
import moment from 'moment';

interface CartItemProps extends ICartItem {
	changeCart: any,
	recalculateCheckout: any,
	setNewCheckout: any
}

const CartItem: FC<CartItemProps> = ({
	item,
	itemId,
	size,
	duration,
	start,
	checkout,
	changeCart,
	recalculateCheckout,
	setNewCheckout,
}) => {
	const startRef = useRef(null);

	const [hours, setHours] = useState<number>(duration);
	const [expiresDatetime, setExpiresDatetime] = useState<undefined | Date>(undefined);

	const setExpiresDatetimeWrapper = (selectedDates: any, dateStr: any) => {
		const updatedDateTime = addHoursToDatetime(selectedDates, dateStr, duration);
		updatedDateTime && setExpiresDatetime(new Date(updatedDateTime));
	};

	const changeDateHandler = (selectedDates: any, dateStr: any) => {
		const hours = selectedDates[0].toString().substring(16, 18);
		const minutes = selectedDates[0].toString().substring(19, 21);
		const updatedDate = moment(dateStr).hours(hours).minutes(minutes).format();
		const updatedCart = changeDateStart(itemId, updatedDate);
		setExpiresDatetimeWrapper(selectedDates, dateStr);
		changeCart(updatedCart);
	};

	const removeItemHandler = (itemId: string) => {
		const updatedCart: ICartItem[] = removeFromCart(itemId);
		changeCart(updatedCart);
		setNewCheckout(recalculateCheckout(updatedCart));
	};

	const changeHourWrapper = (e: any) => {
		const cart2: ICartItem[] = JSON.parse(localStorage.getItem('cart') || '{}'); // TODO fix later (to remove this line of code)
		const updatedCart = changeDuration(itemId, e);
		setHours(e);
		changeCart(updatedCart);
		setNewCheckout(recalculateCheckout(updatedCart));
		// @ts-ignore
		const { selectedDates } = startRef.current?.flatpickr;
		let date = flatpickr.formatDate(selectedDates[0], flatpickrConfig.dateFormat);

		// TODO Code below needs refactoring ( duration updates slowly so its +- 1 of real value )
		const elementToUpdated = updatedCart.filter(e => e.itemId === itemId)[0];
		let updatedDateTime;
		if(cart2.filter(item => item.itemId === itemId)[0].duration < elementToUpdated.duration) {
			updatedDateTime = addHoursToDatetime(selectedDates, date, duration + 1);
		} else if(cart2.filter(item => item.itemId === itemId)[0].duration > elementToUpdated.duration) {
			updatedDateTime = addHoursToDatetime(selectedDates, date, duration - 1);
		}
		updatedDateTime && setExpiresDatetime(new Date(updatedDateTime));
	};

	return (
		<div className={ styles.cart_item }>
			<div className={ styles.cart_item__info }>
				<img className={ styles.cart_item__prev } src={ test1 } alt="prev"/>
				<div className={ styles.cart_item__info_container }>
					<Link className={ styles.cart_item__title } to={ `/item/${ item?.eid }` }>{ item?.title }</Link>
					<div className={ styles.cart_item__datatime_container }>
						<h3 className={ styles.cart_item__datatime_text }>From: </h3>
						<Flatpickr
							ref={ startRef }
							className={ styles.cart_item__datatime_starts }
							placeholder="Rent ends..."
							onReady={ setExpiresDatetimeWrapper }
							onChange={ changeDateHandler }
							options={ flatpickrConfig }
							defaultValue={ flatpickr.formatDate(new Date(start), 'F j, Y H:i') }
						/>
						<h3 className={ styles.cart_item__datatime_text }>To: </h3>
						<Flatpickr
							className={ styles.cart_item__datatime_starts }
							placeholder="Rent ends..."
							value={ expiresDatetime }
							disabled
							options={ flatpickrConfig }
						/>
					</div>
				</div>
			</div>
			<div className={ styles.cart_item__pricing }>
				<SetPrice value={ hours } changeValue={ changeHourWrapper }/>
				<h4 className={ styles.cart_item__hours }>hours</h4>
				<h2 className={ styles.cart_item__price }>{ checkout }$</h2>
				<img className={ styles.cart_item__cancel } src={ cancel } alt="Remove"
				     onClick={ () => removeItemHandler(itemId) }/>
			</div>
		</div>
	);
};

export default CartItem;