const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");
const fetch = require("node-fetch");

//-----------------------------------------------

/*
Outcomes: build a GraphQL wrapper for the the RESTful Animal Crossing API (https://ac-vill.herokuapp.com/villagers?perPage=391)

Return a list of all (391) villagers. 
For each villager, return their:
_id, 
name, 
image, 
personality, 
species,
phrase, 
quote,
birthday
*/

//-----------------------------------------------

const BASE_URL = "https://ac-vill.herokuapp.com/villagers?";

const fetchResByURL = (relativeURL) => {
  return fetch(`${BASE_URL}${relativeURL}`).then((res) => res.json());
};

const fetchVillagers = () => {
  return fetchResByURL("perPage=391");
};

const fetchVillagerByURL = (relativeURL) => {
  return fetchResByURL(relativeURL);
};

//-----------------------------------------------

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

//-----------------------------------------------

const schema = new GraphQLSchema({
  query: QueryType,
});

//-----------------------------------------------

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
