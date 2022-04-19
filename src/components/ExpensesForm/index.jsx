import PropTypes, { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, storeExpense, editExpense } from '../../actions';
import './style.css';

const METHODS_ARRAY = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS_ARRAY = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  id: '',
};

class ExpensesForm extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  handleChange = ({ target: { name, value } }) => {
    const { expenses } = this.props;

    this.setState({
      [name]: value,
      id: expenses.length,
    });
  }

  mapOptions = (arr) => {
    const options = arr.map((word) => (
      <option value={ word } key={ word }>{ word }</option>
    ));

    return options;
  }

  handleSubmit = (event) => {
    const { state, props: { fetchAcronym } } = this;
    event.preventDefault();

    fetchAcronym(storeExpense, state);
    this.setState(INITIAL_STATE);
  }

  render() {
    const {
      props: { currencies },
      state: { value, currency, method, tag, description, id },
      handleChange,
      handleSubmit,
    } = this;

    return (
      <div className="wallet-form-container">
        <form className="wallet-form">
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              onChange={ handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="currencies">
            Moedas:
            <select
              name="currency"
              id="currencies"
              onChange={ handleChange }
              value={ currency }
              data-testid="currency-input"
            >
              { this.mapOptions(currencies) }
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ handleChange }
              value={ method }
            >
              { this.mapOptions(METHODS_ARRAY) }
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ handleChange }
              value={ tag }
            >
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
              onChange={ handleChange }
              value={ description }
            />
          </label>
          <button
            type="submit"
            onClick={ handleSubmit }
            id={ id }
            className="submit-btn"
          >
            Adicionar despesa

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAcronym: (callBack, state) => dispatch(fetchCurrencies(callBack, state)),
  editExpen: (state) => dispatch(editExpense(state)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
