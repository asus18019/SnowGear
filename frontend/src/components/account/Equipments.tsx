import React, { useMemo, useRef, useState } from 'react';
// @ts-ignore
import styles from './Equipments.module.css';
import { useMatch } from 'react-location';
import { LocationGenerics } from '../../router/accountRouter';
import { useSortBy, useTable, useGlobalFilter, usePagination } from 'react-table';
import GlobalFilter from '../UI/GlobalFilter';
import Pagination from '../UI/Pagination';
import { IEquipment } from '../../models/IEquipment';
import fetchResource from '../../api/apiWrapper';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { changeLoader } from '../../store/reducers/LoaderSlice';
import Loader from '../UI/Loader';
import MainModal from '../UI/MainModal';
import SubmitDeleting from '../UI/SubmitDeleting';
import AddEquipment from '../AddEquipment';
import { validateErrorsObject } from '../../utils/validateBodyObject';
import { ModalTypes } from '../../utils/modalTypes';
import { IModal } from '../../pages/Login';
import ModalWindow from '../UI/ModalWindow';

const Equipments = () => {
	const dispatch = useAppDispatch();
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
		const newFormData = { ...editFormData };
		if(fieldName === 'size') {
			// @ts-ignore
			newFormData[fieldName] = fieldValue.split(', ');
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
				console.log(res);
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

				let updated_equipment = { ...res.updated_equipment, size: res.updated_equipment.size.split(', ') };
				equip1[index] = updated_equipment;
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

	const data = useMemo(() => equipmentsState, [equipmentsState]);
	const columns = useMemo(() => ([
		{ Header: 'Id', accessor: 'eid' },
		{ Header: 'Title', accessor: 'title' },
		{ Header: 'Price', accessor: 'price' },
		{ Header: 'Size', accessor: 'size' },
		{ Header: 'Description', accessor: 'description' },
		{ Header: 'Category', accessor: 'category' },
		{ Header: 'Image', accessor: 'image1' },
	]), []);

	const initialState = { hiddenColumns: ['image1'] };

	const tableHooks = (hooks: any) => {
		hooks.visibleColumns.push((columns: any) => [
			...columns,
			{
				id: 'image',
				Header: 'Image',
				// @ts-ignore
				Cell: ({ row }) => (
					<p onClick={ () => console.log(row.original.image) }>
						{ row.original.image }
					</p>
				)
			},
			{
				id: 'action',
				Header: 'Actions',
				// @ts-ignore
				Cell: ({ row }) => (
					<>
						<button className={ styles.table__button } onClick={ () => handleEditEquipment(row.original) }>
							Edit
						</button>
						<button className={ styles.table__button } onClick={ () => handleDeleteEquipment(row.values.eid) }>
							Delete
						</button>
					</>
				),
			}
		]);
	};

	// @ts-ignore
	const tableInstance = useTable({ columns, data, initialState }, tableHooks, useGlobalFilter, useSortBy, usePagination);

	// @ts-ignore
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter, state, pageOptions, gotoPage, canPreviousPage, canNextPage, previousPage, nextPage, pageCount, setPageSize } = tableInstance;

	// @ts-ignore
	const { globalFilter, pageIndex, pageSize } = state;

	return (
		<div className={ styles.equipments__wrapper }>
			{
				isLoading ? <Loader/> : false
			}
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
								// @ts-ignore
								<th { ...column.getHeaderProps(column.getSortByToggleProps()) }
								    className={ styles.equipment_table__th }>
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
				<tbody { ...getTableBodyProps() } className={ styles.equipment_table__tbody }>
					{
						rows.map((row: any) => {
							prepareRow(row);

							return <tr { ...row.getRowProps() } className={ styles.equipment_table__tr }>
								{
									row.cells.map((cell: any) => (
										<td
											className={ styles.equipment_table__td }
											key={ cell.column.id }
											data-label={ cell.column.Header }
											{ ...cell.getCellProps }
										>
											{
												Number(row.values.eid) === updatedRow && cell.column.id !== 'action' && cell.column.id !== 'eid'
													? <input
														className={ styles.row__edit_input }
														type="text"
														value={
														    // @ts-ignore
															cell.column.id === 'size' ? editFormData[cell.column.id].join(', ') :
															//@ts-ignore
															(editFormData[cell.column.id] && editFormData[cell.column.id].toString()) || ''
														}
														onChange={ e => handleEditChange(e) }
														name={ cell.column.id }
													/>
													: Number(row.values.eid) === updatedRow && cell.column.id === 'action'
														? <div className={ styles.save_row__buttons }>
															<button className={ styles.table__button } onClick={ handleSaveEquipment }>Save</button>
															<button className={ styles.table__button } onClick={ () => setUpdatedRow(null) }>Cancel</button>
														</div>
														: cell.column.id === 'size'
															? cell.value = cell.value.join(', ')
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
			<div className={ styles.add_equip__wrapper }>
				<AddEquipment
					// @ts-ignore
					updateEquipments={ setEquipmentsState }
					updateInfoModal={ setModal }
				/>
			</div>
		</div>
	);
};

export default Equipments;