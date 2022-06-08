import React, { FC } from 'react';
// @ts-ignore
import styles from './Pagination.module.css';

interface PaginationProps {
	pageIndex: number,
	pageOptions: number[],
	gotoPage: any,
	pageSize: number,
	setPageSize: any,
	canPreviousPage: boolean,
	canNextPage: boolean,
	previousPage: any,
	nextPage: any,
	pageCount: number
}

const Pagination: FC<PaginationProps> = ({
	pageIndex,
	pageOptions,
	gotoPage,
	pageSize,
	setPageSize,
	canPreviousPage,
	canNextPage,
	previousPage,
	nextPage,
	pageCount,
}) => {
	return (
		<div className={ styles.pagination__wrapper }>
			<div className={ styles.pagination__info }>
				<span>Page <strong>{ pageIndex + 1 } of { pageOptions.length } </strong></span>
				<span>| Go to page: <input
					className={ styles.pagination__goto_input }
					type="number"
					defaultValue={ pageIndex + 1 }
					onChange={ e => {
						const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
						gotoPage(pageNumber);
					} }
					style={ { width: '50px' } }
				/>
				</span>
				<select className={ styles.pagination__size_select }
				        value={ pageSize }
				        onChange={ e => setPageSize(Number(e.target.value)) }>
					{ [5, 10, 25, 50].map(pageSize => (
						<option key={ pageSize } value={ pageSize }>
							Show { pageSize }
						</option>
					)) }
				</select>
			</div>
			<div className={ styles.pagination__buttons }>
				<button className={ styles.pagination__button } onClick={ () => gotoPage(0) }
				        disabled={ !canPreviousPage }>{ '<<' }</button>
				<button className={ styles.pagination__button } onClick={ () => previousPage() }
				        disabled={ !canPreviousPage }>Previous
				</button>
				<button className={ styles.pagination__button } onClick={ () => nextPage() }
				        disabled={ !canNextPage }>Next
				</button>
				<button className={ styles.pagination__button } onClick={ () => gotoPage(pageCount - 1) }
				        disabled={ !canNextPage }>{ '>>' }</button>
			</div>
		</div>
	);
};

export default Pagination;