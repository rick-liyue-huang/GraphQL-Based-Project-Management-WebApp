import React from 'react';
import {FaTrash} from "react-icons/fa";
import {useMutation} from "@apollo/client";
import {DELETE_CLIENT} from "../graphql-conn/mutations/clientMutation";
import {GET_CLIENTS} from "../graphql-conn/queries/clientQuery";
import {GET_PROJECTS} from "../graphql-conn/queries/projectQuery";


export const ClientRow = ({client}) => {

	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: {id: client.id},
		// refresh the page after delete client
		// option one
		refetchQueries: [{query: GET_CLIENTS}, {query: GET_PROJECTS}]
		// option two
		/*update(cache, {data: {deleteClient}}) {
			const {clients} = cache.readQuery({
				query: GET_CLIENTS
			});
			cache.writeQuery({
				query: GET_CLIENTS,
				data: {clients: clients.filter(client => client.id !== deleteClient.id)}
			})
		}*/
	})
	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button
					className={'btn btn-info btn-sm'}
					onClick={deleteClient}
				>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};


