import { API_URL } from "./config.js";
import { async } from "regenerator-runtime";
import { getJson } from "./helper.js";
import { RES_PER_PAGE } from "./config.js";

export const state = {
  recipe: {},
  searchResults: {
    query: "",
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.searchResults.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.searchResults.results = recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {}
};

export const getSearchResultsPage = function (page = state.searchResults.page) {
  state.searchResults.page = page;
  const start = (page - 1) * state.searchResults.resultsPerPage;
  const end = page * state.searchResults.resultsPerPage;

  return state.searchResults.results.slice(start, end);
};
