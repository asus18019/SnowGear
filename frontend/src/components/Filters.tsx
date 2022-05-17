import React, { FC, useState } from 'react';
// @ts-ignore
import styles from './Filters.module.css'; // Todo fix import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Filters: FC = () => {
	const [showFilters, setShowFilters] = useState<boolean>(false);

	const test = () => {
		console.log('Blue work correctly');
	}

	return (
		<div>
			<div
				className={ styles.filters__button }
				onClick={ () => setShowFilters(!showFilters) }
			>
				Filters
				<FontAwesomeIcon className={ styles.filters__icon } icon={ faFilter } />
			</div>

			<div className={ `${ styles.filters } ${ showFilters ? styles.filters_show : false }` }>
				<div className={ styles.filters__search__wrapper }>
					<input onBlur={ test } className={ styles.filters__search } type="text" placeholder="Search..."/>
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
						<input className={ styles.filters__min_price } type="number" placeholder="min"/>
					</div>
					&#8212;
					<div className={ styles.filters__max_price_wrapper }>
						<input className={ styles.filters__max_price } type="number" placeholder="max"/>
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
		</div>
	);
};

export default Filters;