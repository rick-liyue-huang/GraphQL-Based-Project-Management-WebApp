import React from 'react';
import {useQuery} from "@apollo/client";
import {Link, useParams} from "react-router-dom";
import {SpinnerComponent} from "../components/Spinner";
import {GET_SINGLE_PROJECT} from "../graphql-conn/queries/projectQuery";
import {ClientInfoComponent} from "../components/ClientInfo";
import {DeleteProjectButton} from "../components/DeleteProjectButton";
import {EditProjectForm} from "../components/EditProjectForm";


export const ProjectPage = () => {

	const {id} = useParams();

	const {loading, error, data} = useQuery(GET_SINGLE_PROJECT, {
		variables: {id: id}
	});

	if (loading) return <SpinnerComponent />
	if (error) return <p>Something wrong...</p>

	return (
		<>
			{
				!loading && !error && (
					<div className="mx-auto w-75 card p-5">
						<Link to={'/'} className={'btn btn-light btn-sm w-25 d-inline ms-auto'} >Back</Link>
						<h1>{data.project.name}</h1>
						<p>{data.project.description}</p>
						<h5 className="mt-3">Project Status</h5>
						<p className="lead">{data.project.status}</p>

						<ClientInfoComponent client={data.project.client} />

						<EditProjectForm project={data.project} />

						<DeleteProjectButton projectId={data.project.id} />
					</div>
				)
			}
		</>
	);
};


