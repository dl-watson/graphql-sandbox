# graphql-sandbox

### Outcomes: 
Build a GraphQL wrapper for the the RESTful [Animal Crossing API](https://ac-vill.herokuapp.com/villagers).

Return a list of all (391) villagers. For each villager, return their:
* _id, 
* name, 
* image, 
* personality, 
* species,
* phrase, 
* quote,
* birthday

### Queries:
```
{
  allVillagers ...
}
```
Returns a list of all 391 villagers.

```
{
  villager (name: "${name}") ...
}
```
Returns a single villager by a non-optional name argument.

---

Client-side example hosted [here](https://github.com/dl-watson/30_hooks).
