import React, { FC, useState } from 'react';
import styles from './account/AccountData.module.css';
import fetchResource from '../api/apiWrapper';
import { ModalTypes, validateErrorsObject } from '../utils';
import { useAppDispatch } from '../hooks/redux';
import { changeLoader } from '../store';

interface AddEquipmentProps {
	updateEquipments: any,
	updateInfoModal: any
}

const AddEquipment: FC<AddEquipmentProps> = ({ updateEquipments, updateInfoModal }) => {
	const dispatch = useAppDispatch();

	const [title, setTitle] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [category, setCategory] = useState<string>('skies');
	const [description, setDescription] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const [sizes, setSizes] = useState<string>('');

	const handleAddEquipment = () => {
		const body = { title, price, category, description, image, size: sizes.toUpperCase() };
		dispatch(changeLoader(true));
		fetchResource('equipment/create', {
			method: 'POST',
			body: JSON.stringify(body)
		}, true)
			.then(res => {
				updateEquipments((updateEquipments: any) => [...updateEquipments, { ...res[0], size: res[0].size.split(', ') }]);
				updateInfoModal({ type: ModalTypes.success, information: ['Successfully added new equipment'] });
				setTitle('');
				setPrice(0);
				setCategory('skies');
				setDescription('');
				setImage('');
				setSizes('');
			})
			.catch(message => {
				const errorsValidated: string[] = validateErrorsObject(message.errors);
				updateInfoModal({ type: ModalTypes.fail, information: errorsValidated.length ? errorsValidated : ['Unexpected error happened'] });
			})
			.finally(() => dispatch(changeLoader(false)));
	};

	return (
		<div>
			<h2 className={ styles.component__title }>Add new equipment</h2>
			<div className={ styles.line }></div>

			<p className={ styles.property__subtitle }>Add new equipment by filling all inputs in form below and press submit button</p>

			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Title</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } type="email" value={ title } onChange={ e => setTitle(e.target.value) }/>
				</div>
			</div>

			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Price</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } type="number" value={ price > 0 ? price : undefined } onChange={ e => setPrice(Number(e.target.value)) }/>
				</div>
				<p className={ styles.property__subtitle }>Enter price that matches price per 1 hour in dollars</p>
			</div>

			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Category</h3>
				<div className={ styles.input__wrapper }>
					<select className={ styles.property__value } value={ category } onChange={ e => setCategory(e.target.value) }>
						{ ['skies', 'snowboard', 'sleds', 'boots', 'overalls', 'gloves', 'hats'].map(e => (
							<option key={ e } value={ e }>
								{ e }
							</option>
						)) }
					</select>
				</div>
			</div>

			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Description</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } type="text" value={ description } onChange={ e => setDescription(e.target.value) }/>
				</div>
			</div>

			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Image</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } type="text" value={ image } onChange={ e => setImage(e.target.value) }/>
				</div>
			</div>

			<div className={ styles.property__container }>
				<h3 className={ styles.property__title }>Size</h3>
				<div className={ styles.input__wrapper }>
					<input className={ styles.property__value } type="text" value={ sizes } onChange={ e => setSizes(e.target.value) }/>
				</div>
				<p className={ styles.property__subtitle }>Enter size or sizes in line and separate it with ", " to add a few sizes</p>
			</div>

			<div className={ styles.update__profile } onClick={ handleAddEquipment }>Submit adding new equipment</div>
		</div>
	);
};

export default AddEquipment;