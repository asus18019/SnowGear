import React, { useMemo, useState, useRef } from 'react';
// @ts-ignore
import styles from './Users.module.css';
import { useSortBy, useTable, useGlobalFilter, usePagination } from 'react-table';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../router/accountRouter';
import GlobalFilter from '../UI/GlobalFilter';
import { IUser } from '../../models/IUser';
import Pagination from '../UI/Pagination';
import MainModal from '../UI/MainModal';

const Users = () => {
	const { users } = useMatch<LocationGenerics>().data;

	const showOrdersRef = useRef<HTMLDivElement>(null);
	const [userOrders, setUserOrders] = useState<number | null>(null);
	const [updatedRow, setUpdatedRow] = useState<number | null>(null);
	const [editFormData, setEditFormData] = useState<IUser>({
		id: 0,
		name: '',
		surname: '',
		email: '',
		password: '',
		age: 0,
		address: '',
		phone: '',
		bid: 0,
		reid: 0
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
			bid: 0,
			reid: 0
		};
		setEditFormData(formValues);
	};

	const handleSave = () => {
		console.log(editFormData);
		setUpdatedRow(null);
	};

	const handleDelete = (id: number) => {
		console.log(id);
	};

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

	const toggleOrders = (type: boolean, userId: number) => {
		setUserOrders(userId);
		if(type) {
			showOrdersRef.current!.style.display = 'block';
		} else {
			showOrdersRef.current!.style.display = 'none';
		}
		console.log(showOrdersRef.current);
	};

	const tableHooks = (hooks: any) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'action',
				Header: 'Action',
				// @ts-ignore
				Cell: ({ row }) => (
					<div className={ styles.save_row__buttons }>
						<button className={ styles.table__button } onClick={ () => handleEditClick(row.original) }>
							Edit
						</button>
						<button className={ styles.table__button } onClick={ () => handleDelete(row.values.id) }>
							Delete
						</button>
						<button className={ styles.table__button } onClick={ () => toggleOrders(true, row.values.id) }>
							Orders
						</button>
					</div>
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
			<div className={ styles.orders__wrapper } ref={ showOrdersRef }>
				<MainModal toggle={ toggleOrders } userId={userOrders} />
			</div>
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
											{
												Number(row.values.id) === updatedRow && cell.column.id !== 'action' && cell.column.id !== 'id'
												    ? <input
														className={ styles.row__edit_input }
														type="text"
														// @ts-ignore
														value={ editFormData[cell.column.id].toString() }
														onChange={ e => handleEditChange(e) }
														name={ cell.column.id }
													/>
													: Number(row.values.id) === updatedRow && cell.column.id === 'action'
														? <div className={ styles.save_row__buttons }>
															<button className={ styles.table__button } onClick={ handleSave }>Save</button>
															<button className={ styles.table__button } onClick={ () => setUpdatedRow(null) }>Cancel</button>
														</div>
														: cell.render('Cell')
											}
										</td>
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