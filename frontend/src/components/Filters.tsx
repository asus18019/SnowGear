import React, { FC, useState } from 'react';
import styles from './Filters.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../hooks/redux';
import {
	setFilterCategoryProperty,
	setFilterTitleProperty,
	setFilterPriceProperty,
	setFilterSizeProperty
} from '../store/reducers/FiltersSlice';
import { IFilters } from '../models';
import { initialFilters } from '../utils';
import { resetFilters } from '../store/reducers/FiltersSlice';

interface FiltersProps {
	filters: IFilters,
	changeFilters: any
}

const Filters: FC<FiltersProps> = ({ filters, changeFilters }) => {
	const dispatch = useAppDispatch();

	const [showFilters, setShowFilters] = useState<boolean>(false);

	const titleHandler = (title: string) => {
		dispatch(setFilterTitleProperty(title));
		const updatedFilters = {
			...filters,
			titleFilter: { title },
		};
		changeFilters(updatedFilters);
	};

	const categoryCheckboxHandler = (property: string) => {
		dispatch(setFilterCategoryProperty(property));
		const categoryProperty = property as keyof typeof filters.categoryFilter;
		const updatedFilters = {
			...filters,
			categoryFilter: {
				...filters.categoryFilter,
				[categoryProperty]: !filters.categoryFilter[categoryProperty],
			},
		};
		changeFilters(updatedFilters);
	};

	const priceHandler = (minmax: string, value: string) => {
		dispatch(setFilterPriceProperty({ minmax, value: Number(value === '' ? -1 : value) }));
		const updatedFilters = {
			...filters,
			priceFilter: {
				...filters.priceFilter,
				[minmax]: Number(value),
			},
		};

		const priceProperty = minmax as keyof typeof filters.priceFilter;
		if(value === '') {
			updatedFilters.priceFilter[priceProperty] = -1;
		}

		changeFilters(updatedFilters);
	};

	const sizeCheckboxHandler = (size: string) => {
		dispatch(setFilterSizeProperty(size));
		let sizes: string[] = [...filters.sizeFilter.sizes];
		if(sizes.includes(size)) {
			sizes = [...filters.sizeFilter.sizes.filter(elem => elem !== size)];
		} else {
			sizes = [...filters.sizeFilter.sizes, size];
		}

		const updatedFilters = {
			...filters,
			sizeFilter: { sizes },
		};
		changeFilters(updatedFilters);
	};

	const resetFiltersHandler = () => {
		changeFilters(initialFilters);
		dispatch(resetFilters());
	};

	const isSizeChecked = (size: string): boolean => filters.sizeFilter.sizes.includes(size);

	const valueForPriceInput = (minmax: string): string => {
		const property = minmax as keyof typeof filters.priceFilter;

		if(filters.priceFilter[property] !== -1) {
			return filters.priceFilter[property].toString();
		}

		return '';
	};

	return (
		<div>
			<div
				className={ styles.filters__button }
				onClick={ () => setShowFilters(!showFilters) }
			>
				Filters
				<FontAwesomeIcon className={ styles.filters__icon } icon={ faFilter }/>
			</div>

			<div className={ `${ styles.filters } ${ showFilters ? styles.filters_show : false }` }>
				<div className={ styles.filters__search__wrapper }>
					<input className={ styles.filters__search } type="text" placeholder="Search..."
					       onChange={ e => titleHandler(e.target.value) } value={ filters.titleFilter.title }/>
				</div>

				<div className={ styles.filters__price }>
					Category
				</div>
				<hr/>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.skies }
					       onChange={ () => categoryCheckboxHandler('skies') }/>
					<span className={ styles.filters__checkbox_title }>Skies</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.snowboard }
					       onChange={ () => categoryCheckboxHandler('snowboard') }/>
					<span className={ styles.filters__checkbox_title }>Snowboards</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.sleds }
					       onChange={ () => categoryCheckboxHandler('sleds') }/>
					<span className={ styles.filters__checkbox_title }>Sleds</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.boots }
					       onChange={ () => categoryCheckboxHandler('boots') }/>
					<span className={ styles.filters__checkbox_title }>Boots</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.overalls }
					       onChange={ () => categoryCheckboxHandler('overalls') }/>
					<span className={ styles.filters__checkbox_title }>Winter overalls</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.gloves }
					       onChange={ () => categoryCheckboxHandler('gloves') }/>
					<span className={ styles.filters__checkbox_title }>Gloves</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       checked={ filters.categoryFilter.hats }
					       onChange={ () => categoryCheckboxHandler('hats') }/>
					<span className={ styles.filters__checkbox_title }>Hats & ski goggles</span>
				</label>

				<div className={ styles.filters__price }>
					Price
				</div>
				<hr/>
				<div className={ styles.filters__price_wrapper }>
					<div className={ styles.filters__min_price_wrapper }>
						<input className={ styles.filters__min_price } type="number" placeholder="min"
						       onChange={ e => priceHandler('min', e.target.value) }
						       value={ valueForPriceInput('min') }/>
					</div>
					&#8212;
					<div className={ styles.filters__max_price_wrapper }>
						<input className={ styles.filters__max_price } type="number" placeholder="max"
						       onChange={ e => priceHandler('max', e.target.value) }
						       value={ valueForPriceInput('max') }/>
					</div>
				</div>

				<div className={ styles.filters__price }>
					Size
				</div>
				<hr/>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       onChange={ () => sizeCheckboxHandler('xs') }
					       checked={ isSizeChecked('xs') }/>
					<span className={ styles.filters__checkbox_title }>XS</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       onChange={ () => sizeCheckboxHandler('s') }
					       checked={ isSizeChecked('s') }/>
					<span className={ styles.filters__checkbox_title }>S</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       onChange={ () => sizeCheckboxHandler('m') }
					       checked={ isSizeChecked('m') }/>
					<span className={ styles.filters__checkbox_title }>M</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       onChange={ () => sizeCheckboxHandler('l') }
					       checked={ isSizeChecked('l') }/>
					<span className={ styles.filters__checkbox_title }>L</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       onChange={ () => sizeCheckboxHandler('xl') }
					       checked={ isSizeChecked('xl') }/>
					<span className={ styles.filters__checkbox_title }>XL</span>
				</label>
				<label className={ styles.filters__checkbox_wrapper }>
					<input className={ styles.filters__checkbox } type="checkbox"
					       onChange={ () => sizeCheckboxHandler('xxl') }
					       checked={ isSizeChecked('xxl') }/>
					<span className={ styles.filters__checkbox_title }>XXL</span>
				</label>

				<div className={ styles.filters__reset_wrapper }>
					<div className={ styles.filters__reset } onClick={ resetFiltersHandler }>Reset</div>
				</div>

			</div>
		</div>
	);
};

export default Filters;