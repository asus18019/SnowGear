import React, { useMemo } from 'react';
// @ts-ignore
import styles from './CurrentOrders.module.css';
import { useMatch } from 'react-location';
import { useTable, useSortBy } from 'react-table';
import { LocationGenerics } from '../../router/accountRouter';

const CurrentOrders = () => {
	const { currentOrders } = useMatch<LocationGenerics>().data;
	console.log(currentOrders);

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
	]), []);

	const ordersData = useMemo(() => [...data], [data]);
	const ordersColumn = useMemo(() => data[0] ? Object.keys(data[0]).filter(key => key !== 'rating').map(key => {
		console.log('key', key);
		return { Header: key, accessor: key };
	}) : [], [columns]);

	// @ts-ignore
	const tableInstance = useTable({ columns, data: ordersData }, useSortBy);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	return (
		<div className={ styles.current_orders__wrapper }>
			<h2 className={ styles.component__title }>Current rents</h2>
			<div className={ styles.line }></div>
			<table { ...getTableProps() }>
				<thead>
					{ headerGroups.map((headerGroup) => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map((column) => (
								// @ts-ignore
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }>
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
				<tbody { ...getTableBodyProps() }>
					{
						rows.map(row => {
							prepareRow(row);

							return <tr { ...row.getRowProps() }>
								{
									row.cells.map(cell => (
										<td { ...cell.getCellProps }>{ cell.render('Cell') }</td>
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