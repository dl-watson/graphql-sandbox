const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
const { fetchVillagers, fetchVillagerByURL } = require("../utils/fetch");

const QueryType = new GraphQLObjectType({
  name: "Query",
  description:
    "Root query: provides a list of all villagers, or the option to query a single villager by name",
  fields: () => ({
    allVillagers: {
      type: new GraphQLList(VillagerType),
      resolve: fetchVillagers,
    },
    villager: {
      type: new GraphQLList(VillagerType),
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => fetchVillagerByURL(`name=${args.name}`),
    },
  }),
});

const VillagerType = new GraphQLObjectType({
  name: "Villager",
  description: "A villager from ACNH",
  fields: () => ({
    // These fields do not need a resolver, because the default resolver simply accesses the property of the villagers object that has the same name as the supplied field
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    personality: { type: GraphQLString },
    species: { type: GraphQLString },
    phrase: { type: GraphQLString },
    quote: { type: GraphQLString },
    birthday: { type: GraphQLString },
  }),
});

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
