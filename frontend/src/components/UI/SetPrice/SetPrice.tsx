import React, { FC } from 'react';
import styles from './SetPrice.module.css';
import { IHoursObject } from '../../../pages/Item';
import { clearIsSelectedProperty } from '../../../utils/clearIsSelectedProperty';

interface ISetPriceProps {
	value: number;
	changeValue: any;
	data?: IHoursObject[];
	changePrice?: any
}

const SetPrice: FC<ISetPriceProps> = ({ value, changeValue, data, changePrice }) => {
	const handleIncrement = () => {
		data && clearIsSelectedProperty(data);
		let updatedValue: number = Number(value) + 1;
		if(updatedValue <= 72) {
			changeValue(updatedValue);
			changePrice && changePrice(updatedValue);
		}
	};

	const handleDecrement = () => {
		data && clearIsSelectedProperty(data);
		let updatedValue: number = Number(value) - 1;
		if(updatedValue >= 1) {
			changeValue(updatedValue);
			changePrice && changePrice(updatedValue);
		}
	};

	const handleValueChange = (e: any) => {
		if(e <= 72) {
			data && clearIsSelectedProperty(data);
			changeValue(e);
			changePrice && changePrice(e);
		}
	};

	return (
		<div className={ styles.set_price__wrapper }>
			<div className={ styles.cart_item__icons__wrapper } onClick={ handleIncrement }>
				<svg className={ styles.cart_item__icons } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z"/>
				</svg>
			</div>
			<div className={ styles.cart_item__set_hours_wrapper }>
				<input
					className={ styles.cart_item__set_hours }
					value={ value }
					onChange={ (e) => handleValueChange(e.target.value) }
					type="number"
				/>
			</div>
			<div className={ styles.cart_item__icons__wrapper }>
				<svg onClick={ handleDecrement } className={ styles.cart_item__icons }
				     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<g data-name="Layer 2">
						<g data-name="minus">
							<rect width="24" height="24" opacity="0" transform="rotate(180 12 12)"/>
							<path d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"/>
						</g>
					</g>
				</svg>
			</div>
		</div>
	);
};

export default SetPrice;