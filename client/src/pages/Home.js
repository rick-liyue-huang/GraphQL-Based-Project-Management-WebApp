import React from 'react';
import {CreateClientModal} from "../components/AddClientModal";
import {ClientComponent} from "../components/Client";
import ProjectComponent from "../components/Projects";
import {CreateProjectModal} from "../components/addProjectModal";

export const HomePage = () => {
	return (
		<>
			<div className={'d-flex gap-3 mb-4'}>
				<CreateClientModal />
				<CreateProjectModal />
			</div>
			<ProjectComponent />
			<hr/>
			<ClientComponent />
		</>
	);
};

