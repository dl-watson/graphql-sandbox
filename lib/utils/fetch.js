const fetch = require("node-fetch");

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

module.exports = { fetchVillagers, fetchVillagerByURL };
