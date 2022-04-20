import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { clearErrors, setErrors } from './store/reducers/AuthenticatedUserSlice';

function App() {
	const error = useAppSelector(state => state.userReducer.error);
	const dispatch = useAppDispatch();

	const handleClearError = () => dispatch(clearErrors());
	const handleSetError = () => dispatch(setErrors('error 123'));

	return (
		<div className="App">
			<h3>{ error || 'empty' }</h3>
			<button onClick={ handleClearError }>clear errors</button>
			<button onClick={ handleSetError }>set errors</button>
		</div>
	);
}

export default App;
