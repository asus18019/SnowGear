import React, { useMemo } from 'react';
// @ts-ignore
import styles from './CurrentOrders.module.css';
import { useMatch } from 'react-location';
import { useTable, useSortBy } from 'react-table';
import { LocationGenerics } from '../../router/accountRouter';
import OrdersTable from '../OrdersTable';

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

	return (
		<div className={ styles.current_orders__wrapper }>
			<h2 className={ styles.component__title }>Current rents</h2>
			<div className={ styles.line }></div>
			<OrdersTable tableInstance={ tableInstance } />
		</div>
	);
};

export default CurrentOrders;