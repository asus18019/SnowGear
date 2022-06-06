import React, { FC, useState } from 'react';
import { useAsyncDebounce } from 'react-table';
// @ts-ignore
import styles from './GlobalFilter.module.css';

interface GlobalFilterProps {
	filter: string,
	setFilter: any
}

const GlobalFilter: FC<GlobalFilterProps> = ({ filter, setFilter }) => {
	const [value, setValue] = useState<string>(filter);
	const onChange = useAsyncDebounce(value => {
		setFilter(value || undefined);
	}, 1000);

	return (
		<div className={ styles.global_filter__wrapper }>
			Search: {' '}
			<div className={ styles.input__wrapper }>
				<input className={ styles.global_filter__input } value={ value || '' } onChange={ e => {
					setValue(e.target.value);
					onChange(e.target.value);
				} } />
			</div>
		</div>
	);
};

export default GlobalFilter;