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

const CartItem: FC = () => {
	const [expiresDatetime, setExpiresDatetime] = useState<undefined | Date>(undefined);

	const setExpiresDatetimeWrapper = (selectedDates: any, dateStr: any) => {
		let hours: number = 4;
		const updatedDateTime = addHoursToDatetime(selectedDates, dateStr, hours);
		updatedDateTime && setExpiresDatetime(new Date(updatedDateTime));
	};

	return (
		<div className={ styles.cart_item }>
			<div className={ styles.cart_item__info }>
				<img className={ styles.cart_item__prev } src={ test1 } alt="prev"/>
				<div className={ styles.cart_item__info_container }>
					<h2 className={ styles.cart_item__title }>Atomic Vantage 77 Ti Skis w/ M10 GW Bindings Womens</h2>
					<div className={ styles.cart_item__datatime_container }>
						<h3 className={ styles.cart_item__datatime_text }>From: </h3>
						<Flatpickr
							className={ styles.cart_item__datatime_starts }
							placeholder="Rent ends..."
							onReady={ setExpiresDatetimeWrapper }
							onChange={ setExpiresDatetimeWrapper }
							options={ flatpickrConfig }
							defaultValue={ flatpickr.formatDate(new Date('2022-05-06T14:30:31+03:00'), 'F j, Y H:i') }
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
				<SetPrice/>
				<h4 className={ styles.cart_item__hours }>hours</h4>
				<h2 className={ styles.cart_item__price }>75$</h2>
				<img className={ styles.cart_item__cancel } src={ cancel } alt=""/>
			</div>
		</div>
	);
};

export default CartItem;