import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._getNextButton(currentPage);
    }

    // last page

    if (currentPage === numPages && numPages > 1) {
      return this._getPreviousButton(currentPage);
    }

    // other page

    if (currentPage < numPages) {
      return (
        this._getPreviousButton(currentPage) +
        " \n" +
        this._getNextButton(currentPage)
      );
    }
    // page 1, and there are no other pages

    return "";
  }
  _getNextButton(currentPage) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
  }

  _getPreviousButton(currentPage) {
    return `
    <button data-goto="${
      currentPage - 1
    }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const gotoPage = btn.dataset.goto;
      handler(Number.parseInt(gotoPage));
    });
  }
}

export default new PaginationView();
