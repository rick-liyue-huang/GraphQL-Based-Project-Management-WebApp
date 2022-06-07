import React, {useState} from 'react';
import {FaList} from "react-icons/fa";
import {GET_CLIENTS} from "../graphql-conn/queries/clientQuery";
import {GET_PROJECTS} from "../graphql-conn/queries/projectQuery";
import {ADD_PROJECT} from "../graphql-conn/mutations/projectMutation";
import {useMutation, useQuery} from "@apollo/client";


export const CreateProjectModal = () => {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState('new');
	const [clientId, setClientId] = useState('');

	// Get clients
	const {loading, error, data} = useQuery(GET_CLIENTS);

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: {name, description, status, clientId},
		update(cache, {
			data: {addProject}
		}) {
			const {projects} = cache.readQuery({query: GET_PROJECTS});
			cache.writeQuery({
				query: GET_PROJECTS,
				data: {projects: projects.concat([addProject])}
			})
		}

	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (name === '' || description === '' || status === '') {
			return alert('Please fills in all fields')
		}

		addProject(name, description, status, clientId);

		setName('');
		setDescription('');
		setStatus('new');
		setClientId('');
	}

	if (loading) return null;
	if (error) return <p>something wrong...</p>

	return (
		<>
			{
				!loading && !error && (
					<>
						{/*Button trigger modal*/}
						<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
							<div className="d-flex align-items-center">
								<FaList className={'icon'} />
								<div>New Project</div>
							</div>
						</button>

						{/*Modal*/}
						<div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="addProjectModalLabel">Add Project</h5>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										<form onSubmit={handleSubmit}>
											<div className="mb-3">
												<label htmlFor={'name'} className={'form-label'}>Name</label>
												<input
													type="text"
													className={'form-control'}
													id={'name'}
													value={name}
													onChange={e => setName(e.target.value)}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor={'description'} className={'form-label'}>Description</label>
												<textarea
													className={'form-control'}
													id={'description'}
													value={description}
													onChange={e => setDescription(e.target.value)}
												/>
											</div>
											<div className="mb-3">
												<label htmlFor={'status'} className={'form-label'}>Status</label>
												<select
													id="status"
													className={'form-select'}
													value={status}
													onChange={e => setStatus(e.target.value)}
												>
													<option value="new">Not Started</option>
													<option value="progress">In Progress</option>
													<option value="completed">Completed</option>
												</select>
											</div>

											<div className={'mb-3'}>
												<label className={'form-label'}>Client</label>
												<select
													className={'form-select'}
													value={clientId}
													onChange={e => setClientId(e.target.value)}
												>
													<option value="">Select Client</option>
													{
														data.clients.map(client => (
															<option key={client.id} value={client.id}>
																{client.name}
															</option>
														))
													}
												</select>
											</div>
											<button
												type={'submit'} data-bs-dismiss={'modal'}
												className="btn btn-secondary">
												Submit
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</>
				)
			}
		</>
	);
};


