import React, { FC, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
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
import { removeFromCart } from '../utils/cartUtils';

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
	setNewCheckout
}) => {
	const [hours, setHours] = useState<number>(duration);
	const [expiresDatetime, setExpiresDatetime] = useState<undefined | Date>(undefined);

	const setExpiresDatetimeWrapper = (selectedDates: any, dateStr: any) => {
		const updatedDateTime = addHoursToDatetime(selectedDates, dateStr, duration);
		updatedDateTime && setExpiresDatetime(new Date(updatedDateTime));
	};

	const removeItemHandler = (itemId: string) => {
		const updatedCart: ICartItem[] = removeFromCart(itemId);
		changeCart(updatedCart);
		setNewCheckout(recalculateCheckout(updatedCart));
	};

	return (
		<div className={ styles.cart_item }>
			<div className={ styles.cart_item__info }>
				<img className={ styles.cart_item__prev } src={ test1 } alt="prev"/>
				<div className={ styles.cart_item__info_container }>
					<h2 className={ styles.cart_item__title }>{ item?.title }</h2>
					<div className={ styles.cart_item__datatime_container }>
						<h3 className={ styles.cart_item__datatime_text }>From: </h3>
						<Flatpickr
							className={ styles.cart_item__datatime_starts }
							placeholder="Rent ends..."
							onReady={ setExpiresDatetimeWrapper }
							onChange={ setExpiresDatetimeWrapper }
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
				<SetPrice value={ hours } changeValue={ setHours }/>
				<h4 className={ styles.cart_item__hours }>hours</h4>
				<h2 className={ styles.cart_item__price }>{ checkout }$</h2>
				<img className={ styles.cart_item__cancel } src={ cancel } alt="Remove"
				     onClick={ () => removeItemHandler(itemId) }/>
			</div>
		</div>
	);
};

export default CartItem;