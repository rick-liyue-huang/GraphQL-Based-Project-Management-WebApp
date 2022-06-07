import React from 'react';
import {FaExclamationTriangle} from "react-icons/fa";
import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
	return (
		<div className={'d-flex flex-column justify-content-center align-items-center mt-3'}>
			<FaExclamationTriangle className={'text-danger'} size={'6em'} />
			<h1>404</h1>
			<p className={'lead'}>Sorry, the page not found</p>
			<br/>
			<span>Will go to home? </span>
			<Link to={'/'} className={'btn btn-secondary'}>Go back!</Link>
		</div>
	);
};


