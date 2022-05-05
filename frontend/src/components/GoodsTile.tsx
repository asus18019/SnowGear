import React, { FC } from 'react';
// @ts-ignore
import styles from './GoodsTile.module.css';
// @ts-ignore
import test1 from '../assets/test1.jpg';
import { Link } from 'react-location'; // Todo fix import

const GoodsTile: FC = () => {
	return (
		<div className={ styles.item }>
			<img className={ styles.item__image } src={ test1 } alt="SnowGear"/>
			<div className={ styles.item__about }>
				<h4 className={ styles.item__title }>Atomic Vantage 77 Ti Skis w/ M10 GW Bindings Womens</h4>
				<div>
					<div className={ styles.item__price_wrapper }>
						<h2 className={ styles.item__price }>14$ <span className={ styles.item__hours }>/ hour</span>
						</h2>
						<Link className={ styles.link } to="/item">
							<div className={ styles.item__reserve_button }>Reserve</div>
						</Link>
					</div>
					<div className={ styles.ready_tag }>ready</div>
				</div>
			</div>
		</div>
	);
};

export default GoodsTile;