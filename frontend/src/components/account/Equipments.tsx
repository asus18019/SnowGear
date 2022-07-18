import React, { useMemo, useRef, useState } from 'react';
import styles from './Equipments.module.css';
import { useMatch, useNavigate } from 'react-location';
import { LocationGenerics } from '../../router/accountRouter';
import {
	Cell,
	Column,
	Hooks, Row, TableInstance,
	useGlobalFilter,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table';
import { ModalWindow, GlobalFilter, Pagination, Loader, MainModal, SubmitDeleting } from '../UI';
import { IEquipment } from '../../models';
import fetchResource from '../../api/apiWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeLoader } from '../../store';
import AddEquipment from '../AddEquipment';
import { validateErrorsObject, ModalTypes } from '../../utils';
import { IModal } from '../../pages/Login';
import { userState } from '../../store/reducers/AuthenticatedUserSlice';
import { noImage } from '../../assets';

const Equipments = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const userState: userState = useAppSelector(state => state.userReducer);

	if(userState.user?.role_id === 1) {
		navigate({ to: '../profile', fromCurrent: true });
	}

	const { equipments } = useMatch<LocationGenerics>().data;
	const showModalRef = useRef<HTMLDivElement>(null);
	const { isLoading } = useAppSelector(state => state.userReducer);

	const [equipmentsState, setEquipmentsState] = useState<IEquipment[]>(equipments?.length ? equipments : []);
	const [deleteRow, setDeleteRow] = useState<number | null>(null);
	const [updatedRow, setUpdatedRow] = useState<number | null>(null);
	const [editFormData, setEditFormData] = useState<IEquipment>({
		eid: 0,
		title: '',
		description: '',
		image: '',
		price: 0,
		size: [],
		category: ''
	});

	const [modal, setModal] = useState<IModal | undefined>(undefined);

	const handleDeleteEquipment = (id: number) => {
		console.log('Delete: ' + id);
		setDeleteRow(id);
		toggleModal(true);
		return () => {
			dispatch(changeLoader(true));
			fetchResource('equipment/delete', {
				method: 'POST',
				body: JSON.stringify({ eid: id })
			}, true)
				.then(() => setEquipmentsState(prevState => prevState.filter(e => e.eid !== id)))
				.finally(() => dispatch(changeLoader(false)));
			toggleModal(false);
		};
	};

	const handleEditEquipment = (equip: IEquipment) => {
		setUpdatedRow(equip.eid);
		const formValues: IEquipment = {
			eid: equip.eid,
			title: equip.title,
			description: equip.description,
			image: equip.image,
			price: equip.price,
			size: equip.size,
			category: equip.category
		};
		setEditFormData(formValues);
	};

	const handleEditChange = (event: any) => {
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData: IEquipment = { ...editFormData };
		if(fieldName === 'size') {
			newFormData.size = fieldValue.split(', ');
		} else {
			// @ts-ignore
			newFormData[fieldName] = fieldValue;
		}

		setEditFormData(newFormData);
	};

	const handleSaveEquipment = () => {
		dispatch(changeLoader(true));
		fetchResource('equipment/update', {
			method: 'PUT',
			body: JSON.stringify({
				eid: editFormData.eid,
				title: editFormData.title,
				description: editFormData.description,
				image: editFormData.image,
				price: editFormData.price,
				size: editFormData.size.join(', ').toUpperCase(),
				category: editFormData.category
			})
		}, true)
			.then(res => {
				let equip1: IEquipment[];
				if(equipments?.length) {
					equip1 = equipmentsState;
				} else {
					equip1 = [];
				}

				let index: number = -1;
				for(let i = 0; i < equip1.length; i++) {
					if(equip1[i].eid === editFormData.eid) {
						index = i;
					}
				}

				equip1[index] = { ...res.updated_equipment, size: res.updated_equipment.size.split(', ') };
				setEquipmentsState([...equip1]);
				setUpdatedRow(null);
			})
			.catch(message => {
				const errorsValidated: string[] = validateErrorsObject(message.errors);
				setModal({ type: ModalTypes.fail, information: errorsValidated.length ? errorsValidated : ['Unexpected error happened'] });
			})
			.finally(() => dispatch(changeLoader(false)));
	};

	const toggleModal = (type: boolean) => {
		if(type) {
			showModalRef.current!.style.display = 'flex';
		} else {
			showModalRef.current!.style.display = 'none';
		}
	};

	const data: IEquipment[] = useMemo(() => equipmentsState, [equipmentsState]);

	const columns: ReadonlyArray<Column> = useMemo(() => ([
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title' },
		{ Header: 'Price', accessor: 'price' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Description', accessor: 'description' },
		{ Header: 'Category', accessor: 'category' },
	]), []);

	const tableHooks = (hooks: Hooks) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'image',
				Header: 'Image',
				Cell: (cell: Cell<IEquipment>) => (
					<div className={ styles.table__image__wrapper }>
						<img className={ styles.table__image } src={ cell.row.original.image || noImage } alt="a"/>
					</div>
				)
			},
			{
				id: 'action',
				Header: 'Actions',
				Cell: (cell: Cell<IEquipment>) => (
					<>
						<button className={ styles.table__button } onClick={ () => handleEditEquipment(cell.row.original) }>
							Edit
						</button>
						<button className={ styles.table__button } onClick={ () => handleDeleteEquipment(cell.row.values.eid) }>
							Delete
						</button>
					</>
				),
			}
		]);
	};

	const createCellForUsersTable = (row: Row, cell: Cell) => {
		const isRowEqualsUpdatedRow: boolean = Number(row.values.eid) === updatedRow;

		if(isRowEqualsUpdatedRow && cell.column.id !== 'action' && cell.column.id !== 'eid') {
			return <input
				className={ styles.row__edit_input }
				type="text"
				value={
					cell.column.id === 'size'
						? editFormData.size.join(', ')
						: editFormData[cell.column.id as keyof typeof editFormData]?.toString() || ''
				}
				onChange={ e => handleEditChange(e) }
				name={ cell.column.id }
			/>;
		} else if(isRowEqualsUpdatedRow && cell.column.id === 'action') {
			return <div className={ styles.save_row__buttons }>
				<button className={ styles.table__button } onClick={ handleSaveEquipment }>Save</button>
				<button className={ styles.table__button } onClick={ () => setUpdatedRow(null) }>Cancel</button>
			</div>;
		} else if(cell.column.id === 'size') {
			return cell.value.join(', ');
		} else {
			return cell.render('Cell');
		}
	};

	const tableInstance: TableInstance = useTable({ columns, data }, tableHooks, useGlobalFilter, useSortBy, usePagination);
	const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, setGlobalFilter, state, pageOptions, gotoPage, canPreviousPage, canNextPage, previousPage, nextPage, pageCount, setPageSize } = tableInstance;
	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div className={ styles.equipments__wrapper }>
			{ isLoading ? <Loader/> : false }
			{
				<MainModal toggle={ toggleModal } showOrdersRef={ showModalRef } title={ 'Are you sure you want to delete?' }>
					<SubmitDeleting onSubmit={ handleDeleteEquipment } onCancel={ toggleModal } deletingID={ deleteRow } />
				</MainModal>
			}
			{
				modal
					? <ModalWindow type={ modal.type } information={ modal.information } closeHandler={ () => setModal(undefined) }/>
					: false
			}
			<h2 className={ styles.component__title }>Equipments</h2>
			<div className={ styles.line }></div>

			<GlobalFilter filter={ globalFilter } setFilter={ setGlobalFilter } />
			<table { ...getTableProps() } className={ styles.equipment_table }>
				<thead className={ styles.equipment_table__thead }>
					{ headerGroups.map((headerGroup: any) => (
						<tr { ...headerGroup.getHeaderGroupProps() }>
							{ headerGroup.headers.map((column: any) => (
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
								    className={ styles.equipment_table__th }>
									{ column.render('Header') }
									{
										column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''
									}
								</th>
							)) }
						</tr>
					)) }
				</thead>
				<tbody { ...getTableBodyProps() } className={ styles.equipment_table__tbody }>
					{
						page.map((row: any) => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.equipment_table__tr }>
								{
									row.cells.map((cell: any) => (
										<td
											className={ styles.equipment_table__td }
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
			<div className={ styles.add_equip__wrapper }>
				<AddEquipment
					updateEquipments={ setEquipmentsState }
					updateInfoModal={ setModal }
				/>
			</div>
		</div>
	);
};

export default Equipments;