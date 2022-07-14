import React, { useMemo, useState } from 'react';
import styles from './ReturnItem.module.css';
import { Cell, Column, Hooks } from 'react-table';
import flatpickr from 'flatpickr';
import { useNavigate } from 'react-location';
import { IFoundedItem } from '../../models/IFoundedItem';
import { changeLoader } from '../../store/reducers/LoaderSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userState } from '../../store/reducers/AuthenticatedUserSlice';
import fetchResource from '../../api/apiWrapper';
import { IModal } from '../../pages/Login';
import { ModalWindow } from '../UI';
import { ModalTypes } from '../../utils/modalTypes';
import TableComponent from '../TableComponent';

interface ReturnItemTableRow {
	cid: number,
	date_end: string,
	date_start: string,
	duration: number,
	eid: number,
	name: string,
	price: number,
	rented: string,
	status: string,
	surname: string,
	title: string
}

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
						return {
							...e,
							rented: `${e.name} ${e.surname}`,
							date_start: flatpickr.formatDate(new Date(e.date_start), 'F j, Y H:i'),
							date_end: flatpickr.formatDate(new Date(e.date_end), 'F j, Y H:i')
						};
					});
					if(res.length > 0) {
						setItems(formattedData);
					} else {
						setNotFoundString('Nothing found. Try other ID...');
						setItems([]);
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

	const columns: ReadonlyArray<Column> = useMemo(() => ([
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title' },
		{ Header: 'Rented by', accessor: 'rented' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Datestart', accessor: 'date_start' },
		{ Header: 'Dateend', accessor: 'date_end' },
		{ Header: 'Duration (hours)', accessor: 'duration' },
		{ Header: 'Price (total)', accessor: 'price' },
	]), []);

	const tableHooks = (hooks: Hooks) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'rentbtn',
				Header: 'Return',
				Cell: (cell: Cell<ReturnItemTableRow>) => (
					<button className={ styles.return__button } onClick={ () => handleUpdateOrder(cell.row.original.cid) }>Return</button>
				),
			},
		]);
	};

	const tableConfig = {
		columns,
		data: items,
		tableHooks,
		isSearching: false,
		isPaginating: true
	};

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
							<TableComponent config={ tableConfig } />
						</div>
						: false
				}
				{ notFoundString && <p className={ styles.property__subtitle }>{ notFoundString }</p> }
			</div>
		</div>
	);
};

export default ReturnItem;