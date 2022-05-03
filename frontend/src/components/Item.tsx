import React, { FC } from 'react';
// @ts-ignore
import styles from './Item.module.css';
// @ts-ignore
import test1 from '../assets/test1.jpg'; // Todo fix import

const Item: FC = () => {
	return (
		<div className={ styles.item }>
			<img className={styles.item__image} src={test1} alt="SnowGear"/>
			<div className={styles.item__about}>
				<h4 className={styles.item__title}>Atomic Vantage 77 Ti Skis w/ M10 GW Bindings Womens</h4>
				<h2 className={styles.item__price}>14$ <span className={styles.item__hours}>/ hour</span></h2>
				<div className={styles.ready_tag}>ready</div>
			</div>
		</div>
	);
};

export default Item;