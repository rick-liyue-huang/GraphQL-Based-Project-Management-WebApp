// the backup data used to test graphql is working
const {projects, clients} = require('../backupData');
const graphql = require('graphql');

// connect graphql with mongodb model
const Project = require('../models/Project');
const Client = require('../models/Client');

const {
	GraphQLObjectType, GraphQLID, GraphQLString,
	GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType
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
				// return clients.find(client => client.id === parent.clientId);
				// confirm the client is under the project model
				return Client.findById(parent.clientId);
			}
		}
	})
});

// define the query including client clients project and projects
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
				// return clients.find(client => client.id === args.id);
				// get the single Client by id from MongoDB
				return Client.findById(args.id);
			}
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				// return clients;
				// connect with MongoDB client document
				return Client.find();
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
				// return projects.find(project => project.id === args.id);

				// get the single project by id
				return Project.findById(args.id)
			}
		},
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				// return projects;
				return Project.find(); // get all projects from mongoDB
			}
		}
	}
});


// define the mutations
const RootMutation = new GraphQLObjectType({
	name: 'RootMutationType',
	fields: {
		addClient: {
			type: ClientType,
			args: {
				name: {
					type: GraphQLNonNull(GraphQLString)
				},
				email: {
					type: GraphQLNonNull(GraphQLString)
				},
				phone: {
					type: GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parent, args) {

				// using the mongoDB model
				const newClient = new Client({
					name: args.name,
					email: args.email,
					phone: args.phone
				});

				return newClient.save();
			}
		},
		deleteClient: {
			type: ClientType,
			args: {
				id: {
					type: GraphQLNonNull(GraphQLString)
				}
			},
			resolve(parent, args) {
				return Client.findByIdAndRemove(args.id);
			}
		},
		addProject: {
			type: ProjectType,
			args: {
				name: {
					type: GraphQLNonNull(GraphQLString)
				},
				description: {
					type: GraphQLNonNull(GraphQLString)
				},
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatus',
						values: {
							'new': {value: 'Not Started'},
							'progress': {value: 'In Progress'},
							'completed': {value: 'Done'}
						}
					}),
					defaultValue: 'Not Started'
				},
				clientId: {
					type: GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, args) {

				// connect with Project in MongoDB
				const newProject = new Project({
					name: args.name,
					description: args.description,
					status: args.status,
					clientId: args.clientId
				});

				return newProject.save()
			}
		},
		deleteProject: {
			type: ProjectType,
			args: {
				id: {
					type: GraphQLNonNull(GraphQLID)
				}
			},
			resolve(parent, args) {
				return Project.findByIdAndRemove(args.id);
			}
		},
		updateProject: {
			type: ProjectType,
			args: {
				id: {
					type: GraphQLNonNull(GraphQLID)
				},
				name: {
					type: GraphQLString
				},
				description: {
					type: GraphQLString
				},
				status: {
					type: new GraphQLEnumType({
						name: 'ProjectStatusUpdate',
						values: {
							'new': {value: 'Not Started'},
							'progress': {value: 'In Progress'},
							'completed': {value: 'Done'}
						}
					})
				},
			},
			resolve(parent, args) {
				return Project.findByIdAndUpdate(
					args.id,
					{
							$set: {
								name: args.name,
								description: args.description,
								status: args.status
							}
					}, 
					{new: true}
				)
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation
});
