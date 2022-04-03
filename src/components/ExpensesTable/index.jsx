import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';

const TABLE_HEADERS = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir'];
class ExpensesTable extends Component {
  renderTableHeader = () => TABLE_HEADERS
    .map((header) => <th key={ header }>{ header }</th>);

  renderTableBody = () => {
    const { expenses } = this.props;

    const tbody = expenses
      .map(({ value, currency, method, tag, description, exchangeRates }) => {
        const { ask, name } = exchangeRates[currency];

        return (
          <tr key="">
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ parseFloat(value).toFixed(2) }</td>
            <td>{ name }</td>
            <td>{ parseFloat(ask).toFixed(2) }</td>
            <td>{ (ask * value).toFixed(2) }</td>
            <td>Real</td>
            <td>
              <button type="button">
                Editar
              </button>
              <button type="button">
                Excluir
              </button>
            </td>
          </tr>
        );
      });

    return tbody;
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr key="">
              { this.renderTableHeader() }
            </tr>
          </thead>
          <tbody>
            { this.renderTableBody() }
          </tbody>
        </table>

      </div>
    );
  }
}

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(object),
}.isRequired;

export default ExpensesTable;
