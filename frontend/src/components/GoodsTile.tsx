import React, { FC } from 'react';
import { Link } from 'react-location';
// @ts-ignore
import styles from './GoodsTile.module.css';
// @ts-ignore
import noImage from '../assets/no_image.png';

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
			<div className={ styles.item__image_container }>
				<img className={ styles.item__image } src={ image || noImage } alt="SnowGear"/>
			</div>

			<div className={ styles.item__about }>
				<Link className={ styles.link } to={ `/item/${ eid }` }>
					<h4 className={ styles.item__title }>{ title }</h4>
				</Link>
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