import React, { useMemo } from 'react';
// @ts-ignore
import styles from './CurrentOrders.module.css';
import { useMatch } from 'react-location';
import { useTable, useSortBy } from 'react-table';
import { LocationGenerics } from '../../router/accountRouter';

const CurrentOrders = () => {
	const { currentOrders } = useMatch<LocationGenerics>().data;

	const data = useMemo(() => currentOrders?.length ? currentOrders : [], []);
	const columns = useMemo(() => ([
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title' },
		{ Header: 'Price ($/hour)', accessor: 'price' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Category', accessor: 'category' },
		{ Header: 'Datestart', accessor: 'datestart' },
		{ Header: 'Dateend', accessor: 'dateend' },
		{ Header: 'Duration (hours)', accessor: 'duration' },
		{ Header: 'Status', accessor: 'status' },
	]), []);

	const initialState = { hiddenColumns: [''] };

	const tableHooks = (hooks: any) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'totalprice',
				Header: 'Total Price($)',
				// @ts-ignore
				Cell: ({ row }) => (
					<p>
						{ row.values.duration * row.values.price }
					</p>
				),
			},
		]);
	};

	const ordersData = useMemo(() => [...data], [data]);

	// @ts-ignore
	const tableInstance = useTable({ columns, data: ordersData, initialState }, useSortBy, tableHooks);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	return (
		<div className={ styles.current_orders__wrapper }>
			<h2 className={ styles.component__title }>Current rents</h2>
			<div className={ styles.line }></div>
			<table { ...getTableProps() } className={ styles.orders_table }>
				<thead className={ styles.orders_table__thead }>
					{ headerGroups.map((headerGroup) => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map((column) => (
								// @ts-ignore
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
								    className={ styles.orders_table__th }>
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
				<tbody { ...getTableBodyProps() } className={ styles.orders_table__tbody }>
					{
						rows.map(row => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.orders_table__tr }>
								{
									row.cells.map(cell => (
										<td
											className={ styles.orders_table__td }
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
		</div>
	);
};

export default CurrentOrders;