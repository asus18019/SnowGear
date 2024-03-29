import React, { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-location';
import styles from './Users.module.css';
import {
	useSortBy,
	useTable,
	useGlobalFilter,
	usePagination,
	Column,
	Hooks,
	Cell,
	Row,
} from 'react-table';
import { useMatch } from 'react-location';
import flatpickr from 'flatpickr';
import { LocationGenerics } from '../../router/accountRouter';
import { ModalWindow, GlobalFilter, Pagination, MainModal, SubmitDeleting } from '../UI';
import { IUser, IOrder } from '../../models';
import fetchResource from '../../api/apiWrapper';
import { changeLoader } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userState } from '../../store/reducers/AuthenticatedUserSlice';
import { makeFieldsToUpdate, validateBodyObject, ModalTypes } from '../../utils';
import { IModal } from '../../pages/Login';
import TableComponent from '../TableComponent';

const Users = () => {
	const { users } = useMatch<LocationGenerics>().data;
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userState: userState = useAppSelector(state => state.userReducer);

	if(userState.user?.role_id === 1) {
		navigate({ to: '../profile', fromCurrent: true });
	}

	const showOrdersRef = useRef<HTMLDivElement>(null);
	const showDeletingRef = useRef<HTMLDivElement>(null);

	const [modal, setModal] = useState<IModal | undefined>(undefined);
	const [usersState, setUsersState] = useState<IUser[]>(users || []);
	const [userOrders, setUserOrders] = useState<number | null>(null);
	const [updatedRow, setUpdatedRow] = useState<number | null>(null);
	const [deletingRow, setDeletingRow] = useState<number | null>(null);
	const [editFormData, setEditFormData] = useState<IUser>({
		id: 0,
		name: '',
		surname: '',
		email: '',
		password: '',
		age: 0,
		address: '',
		phone: '',
		role_id: 0
	});

	const handleEditChange = (event: any) => {
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...editFormData };
		// @ts-ignore
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	};

	const handleEditClick = (user: IUser) => {
		setUpdatedRow(user.id);
		const formValues: IUser = {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			password: '',
			age: user.age,
			address: user.address,
			phone: user.phone,
			role_id: user.role_id
		};
		setEditFormData(formValues);
	};

	const handleSave = () => {
		const userBeforeEdit: IUser | undefined = users && users.filter(e => e.id === editFormData.id)[0];

		const fields = makeFieldsToUpdate(userBeforeEdit, editFormData);
		const body = validateBodyObject(fields);

		if(Object.keys(body).length) {
			dispatch(changeLoader(true));

			fetchResource('user/update', {
				method: 'PUT',
				body: JSON.stringify(body)
			}, true)
				.then(res => {
					const updatedUser: IUser = res.updated_user;
					const indexOfUpdatedUser: number = usersState.indexOf(usersState.filter(e => e.id === updatedUser.id)[0]);
					const updatedUsersState: IUser[] = usersState;
					updatedUsersState[indexOfUpdatedUser] = updatedUser;
					setUsersState([...updatedUsersState]);
					setUpdatedRow(null);
				})
				.catch(e => setModal({ type: ModalTypes.fail, information: [e.message] }))
				.finally(() => dispatch(changeLoader(false)));
		} else {
			console.log('empty body');
		}
	};

	const handleDelete = (id: number) => {
		setDeletingRow(id);
		toggleDeleting(true);
		return () => {
			dispatch(changeLoader(true));
			fetchResource('user/delete', {
				method: 'DELETE',
				body: JSON.stringify({ userID: id })
			}, true)
				.then(() => setUsersState(prevState => prevState.filter(user => user.id !== id)))
				.finally(() => {
					dispatch(changeLoader(false));
					toggleDeleting(false);
				});
			console.log(id);
		};
	};

	const [currentOrders, setCurrentOrders] = useState<IOrder[]>([]);

	const data1: IOrder[] = useMemo(() => currentOrders?.length ? currentOrders : [], [currentOrders]);
	const columns1: ReadonlyArray<Column> = useMemo(() => ([
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title' },
		{ Header: 'Price ($/hour)', accessor: 'price' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Category', accessor: 'category' },
		{ Header: 'Datestart', accessor: 'date_start' },
		{ Header: 'Dateend', accessor: 'date_end' },
		{ Header: 'Duration (hours)', accessor: 'duration' },
		{ Header: 'Status', accessor: 'status' },
	]), []);

	const tableHooks1 = (hooks: Hooks) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'totalprice',
				Header: 'Total Price($)',
				Cell: (cell: Cell) => (
					<p>
						{ cell.row.values.duration * cell.row.values.price }
					</p>
				),
			},
		]);
	};

	const tableConfig1 = {
		columns: columns1,
		data: data1,
		tableHooks: tableHooks1,
		isSearching: false,
		isPaginating: true
	};

	const toggleOrders = (type: boolean, userId: number | null) => {
		toggleModal(showOrdersRef, type);
	};

	const getOrdersByUser = (id: number) => {
		dispatch(changeLoader(true));
		fetchResource('cart/userorders', {
			method: 'post',
			body: JSON.stringify({ id })
		}, true)
			.then((res: any) => {
				toggleOrders(true, id);
				const formattedData = res.map((e: any) => {
					return {
						...e,
						date_start: flatpickr.formatDate(new Date(e.date_start), 'F j, Y H:i'),
						date_end: flatpickr.formatDate(new Date(e.date_end), 'F j, Y H:i')
					};
				});
				setCurrentOrders(formattedData);
			})
			.finally(() => dispatch(changeLoader(false)));
	};

	const toggleDeleting = (type: boolean) => {
		toggleModal(showDeletingRef, type);
	};

	const toggleModal = (ref: any, type: boolean) => {
		if(type) {
			ref.current!.style.display = 'flex';
		} else {
			ref.current!.style.display = 'none';
		}
	};

	const data: IUser[] = useMemo(() => usersState, [usersState]);
	const columns: ReadonlyArray<Column> = useMemo(() => ([
		{ Header: 'Id', accessor: 'id' },
		{ Header: 'Name', accessor: 'name' },
		{ Header: 'Surname', accessor: 'surname' },
		{ Header: 'Email', accessor: 'email' },
		{ Header: 'Age', accessor: 'age' },
		{ Header: 'Address', accessor: 'address' },
		{ Header: 'Phone', accessor: 'phone' }
	]), []);

	const tableHooks = (hooks: Hooks) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'action',
				Header: 'Action',
				Cell: (cell: Cell<IUser>) => (
					<div className={ styles.save_row__buttons }>
						<button className={ styles.table__button } onClick={ () => handleEditClick(cell.row.original) }>
							Edit
						</button>
						<button className={ styles.table__button } onClick={ () => handleDelete(cell.row.values.id) }>
							Delete
						</button>
						<button className={ styles.table__button } onClick={ () => getOrdersByUser(cell.row.values.id) }>
							Orders
						</button>
					</div>
				),
			},
		]);
	};

	const tableInstance = useTable({ columns, data }, tableHooks, useGlobalFilter, useSortBy, usePagination);
	const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, setPageSize, prepareRow, state, setGlobalFilter } = tableInstance;
	const { globalFilter, pageIndex, pageSize } = state;
	
	const createCellForUsersTable = (row: Row, cell: Cell) => {
		const isRowEqualsUpdatedRow: boolean = Number(row.values.id) === updatedRow;

		if(isRowEqualsUpdatedRow && cell.column.id !== 'action' && cell.column.id !== 'id') {
			return <input
				className={ styles.row__edit_input }
				type="text"
				value={ editFormData[cell.column.id as keyof typeof editFormData] ? editFormData[cell.column.id as keyof typeof editFormData].toString() : '' }
				onChange={ e => handleEditChange(e) }
				name={ cell.column.id }
			/>;
		} else if(isRowEqualsUpdatedRow && cell.column.id === 'action') {
			return <div className={ styles.save_row__buttons }>
				<button className={ styles.table__button } onClick={ handleSave }>Save</button>
				<button className={ styles.table__button } onClick={ () => setUpdatedRow(null) }>Cancel</button>
			</div>;
		} else {
			return cell.render('Cell');
		}
	};

	return (
		<div className={ styles.users__wrapper }>
			<MainModal toggle={ toggleOrders } userId={ userOrders } showOrdersRef={ showOrdersRef } title={ 'All orders' }>
				<TableComponent config={ tableConfig1 } />
			</MainModal>
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
					: false
			}
			<MainModal toggle={ toggleDeleting } showOrdersRef={ showDeletingRef } title={ 'Are you sure you want to delete?' }>
				<SubmitDeleting onSubmit={ handleDelete } onCancel={ toggleDeleting } deletingID={ deletingRow } />
			</MainModal>
			<h2 className={ styles.component__title }>Users list</h2>
			<div className={ styles.line }></div>

			<GlobalFilter filter={ globalFilter } setFilter={ setGlobalFilter } />
			<table { ...getTableProps() } className={ styles.users_table }>
				<thead className={ styles.users_table__thead }>
					{ headerGroups.map((headerGroup, i) => (
						<tr { ...headerGroup.getHeaderGroupProps() } key={ i }>
							{ headerGroup.headers.map((column, j) => (
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
								    className={ styles.users_table__th }
								    key={ j }
								>
									{ column.render('Header') }
									{
										column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''
									}
								</th>
							)) }
						</tr>
					)) }
				</thead>
				<tbody { ...getTableBodyProps() } className={ styles.users_table__tbody }>
					{
						page.map((row: any, i) => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.users_table__tr } key={ i }>
								{
									row.cells.map((cell: any) => (
										<td
											className={ styles.users_table__td }
											key={ cell.column.id }
											data-label={ cell.column.Header }
											{ ...cell.getCellProps }
										>{ createCellForUsersTable(row, cell) }</td>
									))
								}
							</tr>;
						})
					}
				</tbody>
			</table>
			<Pagination
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
		</div>
	);
};

export default Users;