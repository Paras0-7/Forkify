import * as model from "./js/model.js";
import recipeView from "./js/views/recipeView.js";
import searchView from "./js/views/searchView.js";
import resultsView from "./js/views/resultsView.js";

import "core-js/stable"; // for polyfilling everything else like Array.find() method
import "regenerator-runtime/runtime"; //polyfilling async await

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // loading recipe

    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    // rendering recipe

    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // get search query
    const query = searchView.getSearchQuery();

    if (!query) return;

    // load search query results
    await model.loadSearchResults(query);

    resultsView.render(model.state.searchResults.results);
  } catch (err) {}
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
