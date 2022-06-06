
const {projects, clients} = require('../backupData');
const graphql = require('graphql');

const {
	GraphQLObjectType, GraphQLID, GraphQLString,
	GraphQLSchema, GraphQLList
} = graphql;

// define Client type
const ClientType = new GraphQLObjectType({
	name: 'Client',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		phone: {
			type: GraphQLString
		}
	})
});


// define the project type
const ProjectType = new GraphQLObjectType({
	name: 'Project',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		status: {
			type: GraphQLString
		},
		client: {
			type: ClientType,
			resolve(parent, args) {
				return clients.find(client => client.id === parent.clientId);
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		client: {
			type: ClientType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			// Todo: using the backup data as mongodb data
			resolve(parent, args) {
				return clients.find(client => client.id === args.id);
			}
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return clients;
			}
		},
		project: {
			type: ProjectType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				return projects.find(project => project.id === args.id);
			}
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return projects;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
