import icons from "url:../../img/icons.svg";
export default class View {
  _data;
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `
        <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
        `;

    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  renderError() {
    const markup = `
      <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${this._errorMessage}</p>
    </div>
      `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
