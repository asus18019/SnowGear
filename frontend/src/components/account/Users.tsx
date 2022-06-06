import React, { useMemo } from 'react';
// @ts-ignore
import styles from './Users.module.css';
import { useSortBy, useTable, useGlobalFilter, usePagination } from 'react-table';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../router/accountRouter';
import GlobalFilter from '../UI/GlobalFilter';

const Users = () => {
	const { users } = useMatch<LocationGenerics>().data;

	const data = useMemo(() => users?.length ? users : [], []);
	const columns = useMemo(() => ([
		{ Header: 'Id', accessor: 'id' },
		{ Header: 'Name', accessor: 'name' },
		{ Header: 'Surname', accessor: 'surname' },
		{ Header: 'Email', accessor: 'email' },
		{ Header: 'Age', accessor: 'age' },
		{ Header: 'Address', accessor: 'address' },
		{ Header: 'Phone', accessor: 'phone' }
	]), []);

	const tableHooks = (hooks: any) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'action',
				Header: 'Action',
				// @ts-ignore
				Cell: ({ row }) => (
					<p>
						{ row.values.id }
					</p>
				),
			},
		]);
	};

	const ordersData = useMemo(() => [...data], [data]);

	// @ts-ignore
	const tableInstance = useTable({ columns, data: ordersData }, tableHooks, useGlobalFilter, useSortBy, usePagination);
	// @ts-ignore
	const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, prepareRow, state, setGlobalFilter } = tableInstance;
	// @ts-ignore
	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div className={ styles.users__wrapper }>
			<h2 className={ styles.component__title }>Users list</h2>
			<div className={ styles.line }></div>
			<GlobalFilter filter={ globalFilter } setFilter={ setGlobalFilter } />
			<table { ...getTableProps() } className={ styles.users_table }>
				<thead className={ styles.users_table__thead }>
					{ headerGroups.map(headerGroup => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map(column => (
								// @ts-ignore
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
								    className={ styles.users_table__th }
								>
									{ column.render('Header') }
									{
										// @ts-ignore
										column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''
									}
								</th>
							)) }
						</tr>
					)) }
				</thead>
				<tbody { ...getTableBodyProps() } className={ styles.users_table__tbody }>
					{
						page.map((row: any) => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.users_table__tr }>
								{
									row.cells.map((cell: any) => (
										<td
											className={ styles.users_table__td }
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
			<div className={ styles.pagination__wrapper }>
				<div className={ styles.pagination__info }>
					<span>Page <strong>{ pageIndex + 1 } of {pageOptions.length} </strong></span>
					<span>| Go to page: <input
						className={ styles.pagination__goto_input }
						type="number"
						defaultValue={pageIndex + 1}
						onChange={e => {
							const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(pageNumber);
						}}
						style={{ width: '50px' }}
					/>
					</span>
					<select className={ styles.pagination__size_select }
						value={pageSize}
						onChange={e => setPageSize(Number(e.target.value))}>
						{[5, 10, 25, 50].map(pageSize => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
				<div className={ styles.pagination__buttons }>
					<button className={ styles.pagination__button } onClick={ () => gotoPage(0) } disabled={ !canPreviousPage }>{'<<'}</button>
					<button className={ styles.pagination__button } onClick={ () => previousPage() } disabled={ !canPreviousPage }>Previous</button>
					<button className={ styles.pagination__button } onClick={ () => nextPage() } disabled={ !canNextPage }>Next</button>
					<button className={ styles.pagination__button } onClick={ () => gotoPage(pageCount - 1) } disabled={ !canNextPage }>{'>>'}</button>
				</div>
			</div>
		</div>
	);
};

export default Users;