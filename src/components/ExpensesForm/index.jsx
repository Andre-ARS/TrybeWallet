import PropTypes, { string } from 'prop-types';

import React, { Component } from 'react';

const METHODS_ARRAY = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS_ARRAY = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpensesForm extends Component {
  mapOptions = (arr) => {
    const options = arr.map((word) => (
      <option value={ word } key={ word }>{ word }</option>
    ));

    return options;
  }

  render() {
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="text" name="value" id="value" data-testid="value-input" />
        </label>
        <label htmlFor="currencies">
          Moedas:
          <select name="currencies" id="currencies">
            { this.mapOptions(currencies) }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select name="method" id="method" data-testid="method-input">
            { this.mapOptions(METHODS_ARRAY) }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select name="tag" id="tag" data-testid="tag-input">
            { this.mapOptions(TAGS_ARRAY) }
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(string),
}.isRequired;

export default ExpensesForm;
