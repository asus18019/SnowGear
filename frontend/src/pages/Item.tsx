import React, { FC, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Link, useMatch } from 'react-location';
import moment from 'moment';
import uniqid from 'uniqid';
import { sizeParser } from '../utils/clearIsSelectedProperty';
import styles from './Item.module.css';
import AdditionalButton from '../components/UI/AdditionalButton';
// @ts-ignore
import noImage from '../assets/no_image.png';
import SetPrice from '../components/UI/SetPrice';
import { flatpickrConfig } from '../utils/flatpickrConfig';
import { addHoursToDatetime } from '../utils/addHoursToDatetimeFromFlatpickr';
import { LocationGenerics } from '../router/router';
import { ICartItem } from '../models/ICartItem';
import { ModalTypes } from '../utils/modalTypes';
import { IModal } from './Login';
import ModalWindow from '../components/UI/ModalWindow';
import { addInCart } from '../utils/cartUtils';

export interface IisSelected {
	isSelected: boolean;
}

export interface ISizeObject extends IisSelected {
	size: string,
}

export interface IHoursObject extends IisSelected {
	duration: string,
}

const Item: FC = () => {
	const { equipment } = useMatch<LocationGenerics>().data;

	const [modal, setModal] = useState<IModal | undefined>(undefined);
	const [itemSizes, setItemSizes] = useState<ISizeObject[]>(() => sizeParser(equipment));
	const [suggestedDuration, setSuggestedDuration] = useState<IHoursObject[]>([
		{ duration: '1', isSelected: false },
		{ duration: '3', isSelected: false },
		{ duration: '8', isSelected: false },
		{ duration: '24', isSelected: false },
	]);
	const [hours, setHours] = useState<number>(1);
	const [currentPrice, setCurrentPrice] = useState<number>(equipment ? equipment.price : 0);
	const [startDatatime, setStartDatatime] = useState<undefined | string>(undefined);
	const [expiresDatatime, setExpiresDatatime] = useState<undefined | Date>(undefined);

	const clickSizeButton = (e: any) => {
		let updatedIsSelected: ISizeObject[] = itemSizes.map((sizeObj: ISizeObject) => {
			if(sizeObj.isSelected) {
				sizeObj.isSelected = false;
			}

			if(sizeObj.size === e.innerHTML) {
				sizeObj.isSelected = true;
			}

			return sizeObj;
		});

		setItemSizes(updatedIsSelected);
	};

	const clickSuggestedDurationButton = (e: any) => {
		let updatedIsSelected: IHoursObject[] = suggestedDuration.map((durationObj: IHoursObject) => {
			if(durationObj.isSelected) {
				durationObj.isSelected = false;
			}

			if(durationObj.duration === e.innerHTML) {
				durationObj.isSelected = true;
				setCurrentPrice(Number(durationObj.duration) * (equipment?.price || 0));
			}

			return durationObj;
		});

		setHours(Number(e.innerHTML));
		setSuggestedDuration(updatedIsSelected);
	};

	const setHoursWrapper = (e: number) => {
		if(e) {
			setCurrentPrice(e * (equipment?.price || 1));
		} else {
			setCurrentPrice(equipment?.price || 1);
		}
	};

	const setExpiresDataTimeWrapper = (selectedDates: any, dateStr: any) => {
		const updatedDateTime = addHoursToDatetime(selectedDates, dateStr, Number(hours));
		updatedDateTime && setExpiresDatatime(new Date(updatedDateTime));
		let hours1 = selectedDates[0].toString().substring(16, 18);
		let minutes1 = selectedDates[0].toString().substring(19, 21);
		setStartDatatime(moment(dateStr).hours(hours1).minutes(minutes1).format());
	};

	const getCurrentSize = (): ISizeObject => {
		return itemSizes.filter(size => size.isSelected)[0];
	};

	const handleReserve = () => {
		if(!getCurrentSize()) {
			setModal({ type: ModalTypes.fail, information: ['Pick size item'] });
		} else if(!startDatatime) {
			setModal({ type: ModalTypes.fail, information: ['Pick your rental start date'] });
		} else {
			let order: ICartItem = {
				itemId: uniqid(),
				item: equipment,
				size: getCurrentSize().size,
				duration: hours,
				start: startDatatime,
				checkout: currentPrice,
			};
			addInCart(order);
			setModal({ type: ModalTypes.success, information: ['Item was added to cart'] });
		}
	};


	return (
		<div className={ styles.item__wrapper }>
			{ equipment
				? <div className={ styles.item }>
					<h1 className={ styles.item__title }>{ equipment.title }</h1>
					<div className={ styles.item_container }>
						<div className={ styles.item__image_wrapper }>
							<svg className={ styles.item__image_arrows } xmlns="http://www.w3.org/2000/svg"
							     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px"
							     viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
								<g>
									<polyline fill="none" strokeWidth="2" strokeLinejoin="bevel" stroke-miterlimi="10"
									          points="37,15 20,32 37,49"/>
								</g>
							</svg>
							<div className={ styles.item__image_container }>
								<img className={ styles.item__image } src={ equipment.image || noImage } alt=""/>
							</div>
							<svg className={ styles.item__image_arrows } xmlns="http://www.w3.org/2000/svg"
							     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px"
							     viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">
								<g>
									<polyline fill="none" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10"
									          points="27,15 44,32 27,49"/>
								</g>
							</svg>
						</div>

						<div className={ styles.item__about_right }>
							<h3 className={ styles.item__size_title }>Price</h3>
							<hr/>
							<h2 className={ `${ styles.item__price_text } ${ styles.interactive_elements }` }>{ equipment.price }<span
								className={ styles.item__hours_text }>$ / hour</span></h2>
							<h3 className={ styles.item__size_title }>Size</h3>
							<hr/>
							<div></div>
							<div className={ `${ styles.size_button_wrapper } ${ styles.interactive_elements }` }>
								{
									itemSizes[0]
										? itemSizes.map((sizeObj: ISizeObject) => {
											const { size, isSelected } = sizeObj;

											return <AdditionalButton
												size={ size }
												clickHandler={ clickSizeButton }
												key={ size }
												isSelected={ isSelected }
											/>;
										})
										: <p>Not available now</p>
								}
							</div>

							<h3 className={ styles.item__time_title }>Time</h3>
							<hr/>
							<div className={ `${ styles.time_button_wrapper } ${ styles.interactive_elements }` }>
								<div className={ styles.item__set_datatime_wrapper }>
									<SetPrice value={ hours } changeValue={ setHours } changePrice={ setHoursWrapper }
									          data={ suggestedDuration }/>
									<div className={ styles.item__time_button_wrapper }>
										{
											suggestedDuration.map((durationObj: IHoursObject) => {
												const { duration, isSelected } = durationObj;

												return <AdditionalButton
													size={ duration }
													clickHandler={ clickSuggestedDurationButton }
													key={ durationObj.duration }
													isSelected={ isSelected }
												/>;
											})
										}
									</div>
								</div>
								<div className={ styles.item__datatime_wrapper }>
									<div className={ styles.item__datatime_start }>
										<label htmlFor="rent-starts">From:</label>
										<Flatpickr
											id="#item__rent_starts"
											className={ `${ styles.item__datatime }` }
											placeholder="Select date and time..."
											options={ flatpickrConfig }
											onChange={ setExpiresDataTimeWrapper }
										/>
									</div>
									<div className={ styles.item__datatime_end }>
										<label htmlFor="rent-starts">To:</label>
										<Flatpickr
											className={ styles.item__datatime }
											placeholder="Rent ends..."
											value={ expiresDatatime }
											disabled
											options={ flatpickrConfig }
										/>
									</div>
								</div>
							</div>

							<h3 className={ styles.item__time_title }>Checkout</h3>
							<hr/>
							<div className={ `${ styles.checkout_wrapper } ${ styles.interactive_elements }` }>
								<h2 className={ styles.item__price }>{ currentPrice } <span
									className={ styles.item__hours }>$</span>
								</h2>
								<div className={ styles.checkout_button } onClick={ handleReserve }>Reserve</div>
							</div>
							{
								modal
									? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
									: false
							}

							<h3 className={ styles.item__time_title }>Description</h3>
							<hr/>
							<p className={ `${ styles.interactive_elements }` }>{ equipment.description }</p>

						</div>
					</div>
				</div>
				: <h1>Specify correct id <Link to="/shop">Go to shop</Link></h1>
			}
		</div>
	);
};

export default Item;