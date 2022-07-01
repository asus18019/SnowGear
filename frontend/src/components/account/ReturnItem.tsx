import React, { useMemo, useState } from 'react';
import styles from './ReturnItem.module.css';
import { useSortBy, useTable } from 'react-table';
import { useNavigate } from 'react-location';
import { IFoundedItem } from '../../models/IFoundedItem';
import { changeLoader } from '../../store/reducers/LoaderSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userState } from '../../store/reducers/AuthenticatedUserSlice';
import fetchResource from '../../api/apiWrapper';
import { IModal } from '../../pages/Login';
import ModalWindow from '../UI/ModalWindow';
import { ModalTypes } from '../../utils/modalTypes';

const ReturnItem = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userState: userState = useAppSelector(state => state.userReducer);

	if(userState.user?.role_id === 1) {
		navigate({ to: '../profile', fromCurrent: true });
	}

	const [modal, setModal] = useState<IModal | undefined>(undefined);

	const [items, setItems] = useState<IFoundedItem[]>([]);
	const [idInput, setIdInput] = useState<string>('');
	const [notFoundString, setNotFoundString] = useState<string | undefined>();

	const handleFindItems = async () => {
		setNotFoundString(undefined);

		if(idInput.trim()) {
			dispatch(changeLoader(true));
			fetchResource('cart/getcartbyid', {
				method: 'POST',
				body: JSON.stringify({ cid: idInput })
			}, true)
				.then(res => {
					const formattedData = res.map((e: any) => {
						return { ...e, rented: `${e.name} ${e.surname}` };
					});
					console.log(res);
					if(res.length > 0) {
						setItems(formattedData);
					} else {
						setNotFoundString('Nothing found. Try other ID...');
					}
				})
				.catch(e => console.log(e))
				.finally(() => dispatch(changeLoader(false)));
			dispatch(changeLoader(false));
		} else {
			setNotFoundString('Enter id');
		}
	};

	const handleUpdateOrder = (orderId: number) => {
		dispatch(changeLoader(true));
		fetchResource('cart/updatecart', {
			method: 'PUT',
			body: JSON.stringify({ cid: orderId, status: 'expired' })
		}, true)
			.then(() => {
				setModal({ type: ModalTypes.success, information: ['Returned'] });
				handleClearItems();
			})
			.catch(e => console.log(e))
			.finally(() => dispatch(changeLoader(false)));
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
		{ Header: 'Datestart', accessor: 'date_start' },
		{ Header: 'Dateend', accessor: 'date_end' },
		{ Header: 'Duration (hours)', accessor: 'duration' },
		{ Header: 'Price (total)', accessor: 'price' },
	]), []);

	const tableHooks = (hooks: any) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'rentbtn',
				Header: 'Return',
				// @ts-ignore
				Cell: ({ row }) => (
					<button className={ styles.return__button } onClick={ () => handleUpdateOrder(row.original.cid) }>Return</button>
				),
			},
		]);
	};

	// @ts-ignore
	const tableInstance = useTable({ columns, data: items }, useSortBy, tableHooks);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

	return (
		<div className={ styles.return_item__wrapper }>
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
					: false
			}
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
							<table { ...getTableProps() } className={ styles.return_item_table }>
								<thead className={ styles.return_item_table__thead }>
									{ headerGroups.map((headerGroup) => (
										<tr { ...headerGroup.getHeaderGroupProps() }>
											{ headerGroup.headers.map((column) => (
												// @ts-ignore
												<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
												    className={ styles.return_item_table__th }
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
								<tbody { ...getTableBodyProps() }>
									{
										rows.map(row => {
											prepareRow(row);

											return <tr { ...row.getRowProps() } className={ styles.return_item_table__tr }>
												{
													row.cells.map(cell => (
														<td key={ cell.column.id }
														    className={ styles.return_item_table__td }
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