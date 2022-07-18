import React, { useMemo } from 'react';
import styles from './CurrentOrders.module.css';
import { useMatch } from 'react-location';
import { Cell, Column, Hooks } from 'react-table';
import { LocationGenerics } from '../../router/accountRouter';
import { IOrder } from '../../models';
import TableComponent from '../TableComponent';

const CurrentOrders = () => {
	const { currentOrders } = useMatch<LocationGenerics>().data;

	const data: IOrder[] = useMemo(() => currentOrders?.length ? currentOrders : [], []);
	const columns: ReadonlyArray<Column> = useMemo(() => [
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title', width: 700 },
		{ Header: 'Price ($/hour)', accessor: 'price' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Category', accessor: 'category' },
		{ Header: 'Date start', accessor: 'datestart', width: 400 },
		{ Header: 'Date end', accessor: 'dateend', width: 400 },
		{ Header: 'Duration (hours)', accessor: 'duration' },
		{ Header: 'Status', accessor: 'status' },
	], []);

	const tableHooks = (hooks: Hooks) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'totalprice',
				Header: 'Total Price($)',
				Cell: (cell: Cell) => (
					<p>{ cell.row.values.duration * cell.row.values.price }</p>
				),
			},
		]);
	};
	
	const config = {
		columns,
		data,
		tableHooks,
		isSearching: true,
		isPaginating: false
	};

	return (
		<div className={ styles.current_orders__wrapper }>
			<h2 className={ styles.component__title }>Current rents</h2>
			<div className={ styles.line }></div>
			<TableComponent config={ config }/>
		</div>
	);
};

export default CurrentOrders;