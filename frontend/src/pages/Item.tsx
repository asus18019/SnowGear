import React, { FC, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { Link, useMatch } from 'react-location';
import moment from 'moment';
import uniqid from 'uniqid';
import { sizeParser, flatpickrConfig, addHoursToDatetime, extractDataTime, addInCart, ModalTypes } from '../utils';
import styles from './Item.module.css';
import { AdditionalButton, SetPrice, ModalWindow } from '../components/UI';
import { noImage, leftArrow, LeftArrowSvg } from '../assets';
import { LocationGenerics } from '../router/router';
import { ICartItem, IHoursObject, ISizeObject, IOrderInfo } from '../models';
import { IModal } from './Login';

const Item: FC = () => {
	const { equipment } = useMatch<LocationGenerics>().data;
	const price: number = equipment?.price || 0;

	const [modal, setModal] = useState<IModal | undefined>(undefined);
	const [itemSizes, setItemSizes] = useState<ISizeObject[]>(() => sizeParser(equipment) || []);
	const [suggestedDuration, setSuggestedDuration] = useState<IHoursObject[]>([
		{ duration: '1', isSelected: false },
		{ duration: '3', isSelected: false },
		{ duration: '8', isSelected: false },
		{ duration: '24', isSelected: false },
	]);

	const [orderInfo, setOrderInfo] = useState<IOrderInfo>({
		hours: Number(suggestedDuration.find(item => item.isSelected)?.duration) || 1,
		size: itemSizes?.find(item => item.isSelected)?.size || '',
		startDatetime: new Date(),
		endDatetime: ''
	});

	const clickSizeButton = (element: HTMLDivElement) => {
		const size = element.innerText;
		setOrderInfo({ ...orderInfo, size });

		const updatedItemSizes = selectSizeOrDuration(itemSizes, 'size', size.toString());
		setItemSizes(updatedItemSizes);
	};

	const clickSuggestedDurationButton = (element: HTMLDivElement) => {
		const duration = Number(element.innerText);
		changeHours(duration);

		const updatedSuggestedDuration = selectSizeOrDuration(suggestedDuration, 'duration', duration.toString());
		setSuggestedDuration(updatedSuggestedDuration);
	};

	const selectSizeOrDuration = <T extends ISizeObject | IHoursObject, U extends Exclude<keyof T, 'isSelected'>>(data: T[], key: U, value: T[U]) => {
		return data.map(item => {
			return { ...item, isSelected: item[key] === value };
		});
	};

	const onDateChange = () => {
		console.log(orderInfo);
	};

	const handleReserve = () => {
		if(!getCurrentSize()) {
			setModal({ type: ModalTypes.fail, information: ['Pick size item'] });
		// } else if(!getStartDatatime()) {
		// 	setModal({ type: ModalTypes.fail, information: ['Pick your rental start date'] });
		} else {
			const order: ICartItem = {
				itemId: uniqid(),
				item: equipment,
				size: getCurrentSize() || '',
				duration: orderInfo.hours,
				start: orderInfo.startDatetime.toString(),
				checkout: price * orderInfo.hours,
			};
			console.log(order);
			addInCart(order);
			setModal({ type: ModalTypes.success, information: ['Item was added to cart'] });
		}
	};

	const getCurrentSize = () => orderInfo.size;

	const getHours = () => orderInfo.hours;

	const getStartDatetime = () => orderInfo.startDatetime;

	const changeHours = (updatedHours: number) => setOrderInfo({ ...orderInfo, hours: updatedHours });

	const changeHoursWrapper = (updatedHours: number) => {
		changeHours(updatedHours);
		const updatedSuggestedDuration = selectSizeOrDuration(suggestedDuration, 'duration', '');
		setSuggestedDuration(updatedSuggestedDuration);
	};

	return (
		<div className={ styles.item__wrapper }>
			{ equipment
				? <div className={ styles.item }>
					<h1 className={ styles.item__title }>{ equipment.title }</h1>
					<div className={ styles.item_container }>
						<div className={ styles.item__image_wrapper }>
							{/*<svg className={ styles.item__image_arrows } xmlns="http://www.w3.org/2000/svg"*/}
							{/*     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px"*/}
							{/*     viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve">*/}
							{/*	<g>*/}
							{/*		<polyline fill="none" strokeWidth="2" strokeLinejoin="bevel" stroke-miterlimi="10"*/}
							{/*		          points="37,15 20,32 37,49"/>*/}
							{/*	</g>*/}
							{/*</svg>*/}
							{/*<img className={ styles.item__image_arrows } src={ leftArrow } alt=""/>*/}
							<LeftArrowSvg />
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
									itemSizes
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
								<div className={ styles.item__set_datetime_wrapper }>
									<SetPrice value={ orderInfo.hours } changeValue={ changeHoursWrapper } />
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
								<div className={ styles.item__datetime_wrapper }>
									<div className={ styles.item__datetime_start }>
										<label htmlFor="rent-starts">From:</label>
										<Flatpickr
											id="#item__rent_starts"
											className={ `${ styles.item__datetime }` }
											placeholder="Select date and time..."
											options={ flatpickrConfig }
											value={ orderInfo.startDatetime }
											onChange={ onDateChange }
										/>
									</div>
									<div className={ styles.item__datetime_end }>
										<label htmlFor="rent-starts">To:</label>
										<Flatpickr
											className={ styles.item__datetime }
											placeholder="Rent ends..."
											value={ new Date(orderInfo.endDatetime) }
											disabled
											options={ flatpickrConfig }
										/>
									</div>
								</div>
							</div>

							<h3 className={ styles.item__time_title }>Checkout</h3>
							<hr/>
							<div className={ `${ styles.checkout_wrapper } ${ styles.interactive_elements }` }>
								<h2 className={ styles.item__price }>{ orderInfo.hours * price } <span
									className={ styles.item__hours }>$</span>
								</h2>
								<div className={ styles.checkout_button } onClick={ handleReserve }>Reserve</div>
							</div>
							{
								modal
									? <ModalWindow
										type={ modal.type }
										information={ modal.information }
										closeHandler={ () => setModal(undefined) }
									/>
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