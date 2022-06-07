import React from 'react';
import {useQuery} from '@apollo/client';
import {ClientRow} from "./ClientRow";
import {GET_CLIENTS} from "../queries/clientQuery";
import {SpinnerComponent} from "./Spinner";


export const ClientComponent = () => {

	const {loading, error, data} = useQuery(GET_CLIENTS);
	console.log(data);

	if (loading) return <SpinnerComponent />
	if (error) return <p>something wrong...</p>

	return (
		<>
			{
				!loading && !error && (
					<table className={'table table-hover mt-3'}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
						{
							data.clients.map(client => (
								<ClientRow
									key={client.id} client={client}
								/>
							))
						}
						</tbody>
					</table>
				)
			}
		</>
	);
};


