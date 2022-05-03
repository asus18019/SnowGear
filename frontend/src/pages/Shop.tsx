import React, { FC } from 'react';
// @ts-ignore
import styles from './Shop.module.css'; // Todo fix import
import Item from '../components/Item';

const Shop: FC = () => {
	return (
		<div className={ styles.shop__wrapper }>
			<div className={ styles.shop }>
				<div className={ styles.filters }>
					<div className={ styles.filters__search__wrapper }>
						<input className={ styles.filters__search } type="text" placeholder="Search..."/>
					</div>

					<div className={ styles.filters__price }>
						Category
					</div>
					<hr/>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Skies</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Snowboards</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Sleds</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Boots</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Winter overalls</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Gloves</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>Hats & ski goggles</span>
					</label>

					<div className={ styles.filters__price }>
						Price
					</div>
					<hr/>
					<div className={ styles.filters__price_wrapper }>
						<div className={ styles.filters__min_price_wrapper }>
							<input className={styles.filters__min_price} type="number" placeholder="min"/>
						</div>
						&#8212;
						<div className={ styles.filters__max_price_wrapper }>
							<input className={styles.filters__max_price} type="number" placeholder="max"/>
						</div>
					</div>

					<div className={ styles.filters__price }>
						Size
					</div>
					<hr/>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>XS</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>S</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>M</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>L</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>XL</span>
					</label>
					<label className={ styles.filters__checkbox_wrapper }>
						<input className={ styles.filters__checkbox } type="checkbox"/>
						<span className={ styles.filters__checkbox_title }>XXL</span>
					</label>

				</div>
				<div className={ styles.item__wrapper }>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
					<Item/>
				</div>
			</div>
		</div>
	);
};

export default Shop;