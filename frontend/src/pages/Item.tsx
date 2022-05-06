import React, { FC, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import moment from 'moment';
// @ts-ignore
import styles from './Item.module.css';
import SizeButton from '../components/UI/SizeButton';
// @ts-ignore
import test1 from '../assets/test1.jpg';
import SetPrice from '../components/UI/SetPrice';
import { flatpickrConfig } from '../utils/flatpickrConfig';
import { addHoursToDatetime } from '../utils/addHoursToDatetimeFromFlatpickr';

const Item: FC = () => {

	const [expiresDatatime, setExpiresDatatime] = useState<undefined | Date>(undefined);

	const setExpiresDataTimeWrapper = (selectedDates: any, dateStr: any) => {
		const updatedDateTime = addHoursToDatetime(selectedDates, dateStr, 2);
		updatedDateTime && setExpiresDatatime(new Date(updatedDateTime));
	};

	return (
		<div className={ styles.item__wrapper }>
			<div className={ styles.item }>
				<h1 className={ styles.item__title }>Atomic Vantage 77 Ti Skis w/ M10 GW Bindings Womens</h1>
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
						<img className={ styles.item__image } src={ test1 } alt=""/>
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
						<h2 className={ `${ styles.item__price_text } ${ styles.interactive_elements }` }>17<span
							className={ styles.item__hours_text }>$ / hour</span></h2>
						<h3 className={ styles.item__size_title }>Size</h3>
						<hr/>
						<div></div>
						<div className={ `${ styles.size_button_wrapper } ${ styles.interactive_elements }` }>
							<SizeButton size={ 'S' }/>
							<SizeButton size={ 'L' }/>
							<SizeButton size={ 'XL' }/>
						</div>

						<h3 className={ styles.item__time_title }>Time</h3>
						<hr/>
						<div className={ `${ styles.time_button_wrapper } ${ styles.interactive_elements }` }>
							<div className={ styles.item__set_datatime_wrapper }>
								<SetPrice/>
								<div className={ styles.item__time_button_wrapper }>
									<SizeButton size={ '1 Hour' }/>
									<SizeButton size={ '3 Hour' }/>
									<SizeButton size={ '8 Hours' }/>
									<SizeButton size={ '24 Hours' }/>
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
							<h2 className={ styles.item__price }>56 <span className={ styles.item__hours }>$</span></h2>
							<div className={ styles.checkout_button }>Reserve</div>
						</div>

						<h3 className={ styles.item__time_title }>Description</h3>
						<hr/>
						<p className={ `${ styles.interactive_elements }` }>Stradivarius випускає модний одяг і
							аксесуари.
							Бренд Stradivarius з'явився 1994 року в сонячній Барселоні. Впізнаваним символом
							Stradivarius стало його написання — замість першої літери зображено скрипковий ключ.
							Одяг компанії вирізняється універсальністю, жіночністю й чудовою якістю. В асортименті
							Stradivarius є взуття, прикраси, ремені, окуляри, аксесуари та інші приємні для будь-якої
							жінки дрібниці. Марка випускає додаткові колекції для різних країн, з огляду на місцеві
							переваги.</p>

					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;