import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_PROJECTS} from "../graphql-conn/queries/projectQuery";
import {SpinnerComponent} from "./Spinner";
import {ProjectCard} from "./ProjectCard";


const ProjectComponent = () => {

	const {loading, error, data} = useQuery(GET_PROJECTS);

	if (loading) return <SpinnerComponent />
	if (error) return <p>Something wrong...</p>

	return (
		<>
			{
				data.projects.length > 0 ? (
					<div className={'row mt-5'}>
						{
							data.projects.map(project => (
								<ProjectCard key={project.id} project={project} />
							))
						}
					</div>
				) : (
					<p>No Projects</p>
				)
			}
		</>
	);
};

export default ProjectComponent;
