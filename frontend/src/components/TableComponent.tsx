import React, { FC } from 'react';
import styles from './TableComponent.module.css';
import {
	Column, TableInstance,
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table';
import { GlobalFilter, Pagination } from './UI';

export interface TableComponentProps<T> {
	config: {
		columns: ReadonlyArray<Column>,
		data: T[],
		tableHooks: any,
		isSearching: boolean,
		isPaginating: boolean,
	},
}

const TableComponent: FC<TableComponentProps<any>> = ({ config }) => {
	const { columns, data, tableHooks, isSearching, isPaginating } = config;

	const tableInstance: TableInstance = useTable({ columns, data }, tableHooks, useGlobalFilter, useSortBy, usePagination);
	
	const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, prepareRow, state, setGlobalFilter } = tableInstance;
	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<>
			{ isSearching ? <GlobalFilter filter={ globalFilter } setFilter={ setGlobalFilter } /> : false }
			<table { ...getTableProps() } className={ styles.table_component }>
				<thead className={ styles.table_component__thead }>
					{ headerGroups.map((headerGroup: any) => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map((column: any) => (
								<th { ...column.getHeaderProps(column.getSortByToggleProps({ style: { minWidth: column.minWidth, width: column.width } })) }
								    className={ styles.table_component__th }>
									{ column.render('Header') }
									{
										column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''
									}
								</th>
							)) }
						</tr>
					)) }
				</thead>
				<tbody { ...getTableBodyProps() } className={ styles.table_component__tbody }>
					{
						page.map((row: any) => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.table_component__tr }>
								{
									row.cells.map((cell: any) => (
										<td
											className={ styles.table_component__td }
											key={ cell.column.id }
											data-label={ cell.column.Header }
											{ ...cell.getCellProps }
										>
											{ cell.render('Cell') }
										</td>
									))
								}
							</tr>;
						})
					}
				</tbody>
			</table>
			{
				isPaginating
					? <Pagination
						pageIndex={ pageIndex }
						pageOptions={ pageOptions }
						gotoPage={ gotoPage }
						canPreviousPage={ canPreviousPage }
						canNextPage={ canNextPage }
						previousPage={ previousPage }
						nextPage={ nextPage }
						pageCount={ pageCount }
						pageSize={ pageSize }
						setPageSize={ setPageSize }
					/>
					: false
			}
			
		</>
	);
};

export default TableComponent;