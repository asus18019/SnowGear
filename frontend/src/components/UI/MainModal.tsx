import React, { FC, useMemo } from 'react';
// @ts-ignore
import styles from './MainModal.module.css';
import { useSortBy, useTable } from 'react-table';
import { IOrder } from '../../models/IOrder';
import OrdersTable from './OrdersTable';

interface MainModalProps {
	toggle: any,
	userId: number| null
}

const MainModal: FC<MainModalProps> = ({ toggle, userId }) => {
	const currentOrders: IOrder[] = [
		{
			eid: 9,
			title: 'Перчатки женские Descente 85 DWCMGD02',
			price: 10,
			size: 'XL',
			category: 'gloves',
			datestart: 'April 30, 2022 08:00',
			dateend: 'May 1, 2022 08:00',
			duration: 5,
			status: 'expired'
		},
		{
			eid: 1,
			title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
			price: 13.5,
			size: 'S',
			category: 'boots',
			datestart: 'April 30, 2022 08:00',
			dateend: 'May 1, 2022 08:00',
			duration: 3,
			status: 'current'
		},
		{
			eid: 1,
			title: 'Ботинки сноубордические Deeluxe Velvet Lara Black/red 571077-1000',
			price: 13.5,
			size: 'L',
			category: 'boots',
			datestart: 'April 2, 2022 08:00',
			dateend: 'May 5, 2022 08:00',
			duration: 45,
			status: 'expired'
		},
		{
			eid: 3,
			title: 'Sleds LC1412400',
			price: 20.5,
			size: 'M',
			category: 'sleds',
			datestart: 'April 30, 2022 08:00',
			dateend: 'May 1, 2022 08:00',
			duration: 9,
			status: 'expired'
		}
	];

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
		<div id="myModal" className={ `${styles.modal}` }>
			<div className={styles.modal__content}>
				<div className={styles.modal__header}>
					<span className={ styles.close } onClick={ () => toggle(false) }>&times;</span>
					<h2>Modal Header</h2>
				</div>
				<div className={styles.modal__body}>
					<OrdersTable tableInstance={tableInstance} />
				</div>
			</div>
		</div>
	);
};

export default MainModal