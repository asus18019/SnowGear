import React, { useMemo, useState } from 'react';
// @ts-ignore
import styles from './ReturnItem.module.css';
import { useSortBy, useTable } from 'react-table';
import { IFoundedItem } from '../../models/IFoundedItem';
import { getMockFoundedItems } from '../../utils/dbMock';
import { changeLoader } from '../../store/reducers/LoaderSlice';
import { useAppDispatch } from '../../hooks/redux';

const ReturnItem = () => {
	const dispatch = useAppDispatch();

	const [items, setItems] = useState<IFoundedItem[]>([]);
	const [idInput, setIdInput] = useState<string>('');
	const [notFoundString, setNotFoundString] = useState<string | undefined>();

	const handleFindItems = async () => {
		setNotFoundString(undefined);
		dispatch(changeLoader(true));

		const data = await getMockFoundedItems();
		if(data.length > 0) {
			setItems(data);
		} else {
			setNotFoundString('Nothing found. Try other ID...');
		}

		dispatch(changeLoader(false));
	};

	const handleClearItems = () => {
		setItems([]);
		setIdInput('');
		setNotFoundString(undefined);
	};

	const columns = useMemo(() => ([
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title' },
		{ Header: 'Rented by', accessor: 'rented' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Datestart', accessor: 'datestart' },
		{ Header: 'Dateend', accessor: 'dateend' },
		{ Header: 'Duration (hours)', accessor: 'duration' },
		{ Header: 'Price ($/hour)', accessor: 'price' },
	]), []);

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
			{
				id: 'rentbtn',
				Header: 'Return',
				// @ts-ignore
				Cell: ({ row }) => (
					<button className={ styles.return__button } onClick={ () => alert(row.values.eid) }>Return</button>
				),
			},
		]);
	};

	// @ts-ignore
	const tableInstance = useTable({ columns, data: items }, useSortBy, tableHooks);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	return (
		<div className={ styles.return_item__wrapper }>
			<h2 className={ styles.component__title }>Return item</h2>
			<div className={ styles.line }></div>

			<p className={ styles.property__subtitle }>Your name may appear around GitHub where you contribute or
				are mentioned. You can remove it at any time.</p>
			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Item & order ID</h3>
				<div className={ styles.form__wrapper }>
					<div className={ styles.input__wrapper }>
						<input className={ styles.property__value } onChange={ e => setIdInput(e.target.value) }
						       value={ idInput } type="text"/>
					</div>
					<div className={ styles.form__buttons }>
						<div className={ styles.find_item } onClick={ handleFindItems }>Find</div>
						<div className={ styles.find_item } onClick={ handleClearItems }>Clear</div>
					</div>
				</div>
				{
					items.length > 0
						? <div className={ styles.test }>
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
														<td key={ cell.column.id }
														    data-label={ cell.column.Header } { ...cell.getCellProps }>{ cell.render('Cell') }</td>
													))
												}
											</tr>;
										})
									}
								</tbody>
							</table>
						</div>
						: false
				}
				{
					notFoundString && <p className={ styles.property__subtitle }>{ notFoundString }</p>
				}
			</div>
		</div>
	);
};

export default ReturnItem;