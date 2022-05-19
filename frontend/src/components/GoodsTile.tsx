import React, { FC } from 'react';
import { Link } from 'react-location';
// @ts-ignore
import styles from './GoodsTile.module.css';
// @ts-ignore
import test1 from '../assets/test1.jpg';

interface GoodsTileProps {
	eid: number
	image: string,
	title: string,
	price: number,
	size: string[]
}

const GoodsTile: FC<GoodsTileProps> = ({ eid, image, title, price, size }) => {
	return (
		<div className={ styles.item }>
			<img className={ styles.item__image } src={ test1 } alt="SnowGear"/>
			<div className={ styles.item__about }>
				<h4 className={ styles.item__title }>{ title }</h4>
				<div>
					<div className={ styles.item__price_wrapper }>
						<h2 className={ styles.item__price }>{ price }$ <span
							className={ styles.item__hours }>/ hour</span>
						</h2>
						<Link className={ styles.link } to={ `/item/${ eid }` }>
							<div className={ styles.item__reserve_button }>Reserve</div>
						</Link>
					</div>
					{
						size[0]
							? <div className={ styles.ready_tag }>ready</div>
							: <div className={ styles.over_tag }>out of stock</div>
					}
				</div>
			</div>
		</div>
	);
};

export default GoodsTile;