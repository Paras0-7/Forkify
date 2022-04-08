import * as model from "./js/model.js";
import recipeView from "./js/views/recipeView.js";
import searchView from "./js/views/searchView.js";
import resultsView from "./js/views/resultsView.js";
import paginationView from "./js/views/paginationView.js";
import bookmarksView from "./js/views/bookmarksView.js";
import addRecipeView from "./js/views/addRecipeView.js";

import "core-js/stable"; // for polyfilling everything else like Array.find() method
import "regenerator-runtime/runtime"; //polyfilling async await

// if (module.hot) {
//   module.hot.accept();
// }
const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

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

    // resultsView.render(model.state.searchResults.results);
    resultsView.render(model.getSearchResultsPage(1));

    // render pagination buttons
    paginationView.render(model.state.searchResults);
  } catch (err) {}
};

const controlPagination = function (gotoPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(gotoPage));
  // render new pagination buttons
  paginationView.render(model.state.searchResults);
};

const controlServings = function (newServings) {
  // update the recipe servings ( in state )
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
  // update the recipe view
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);

    // change id in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);
