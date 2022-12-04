const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLList } =
  graphql;

const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    facebookId: { type: GraphQLString },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        return _.filter(tasks, { userId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { facebookId: { type: GraphQLString } },
      resolve(parent, args) {
        // return _.find(users, { facebookId: args.facebookId });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
