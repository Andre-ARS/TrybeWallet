import PropTypes, { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, storeExpense, editExpense } from '../../actions';

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

  handleEditorMode = () => {
    const { editorExpense: {
      value, currency, method, tag, description, id } } = this.props;
    const { id: stateId } = this.state;

    if (id !== stateId) {
      this.setState({
        value,
        currency,
        method,
        tag,
        description,
        id,
      });
    }
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

  handleEdit = (event) => {
    const { state, props: { editExpen } } = this;
    event.preventDefault();

    editExpen(state);
    this.setState(INITIAL_STATE);
  }

  handleSubmit = (event) => {
    const { state, props: { fetchAcronym } } = this;
    event.preventDefault();

    fetchAcronym(storeExpense, state);
    this.setState(INITIAL_STATE);
  }

  render() {
    const {
      props: { currencies, editorMode },
      state: { value, currency, method, tag, description, id },
      handleChange,
      handleSubmit,
      handleEdit,
    } = this;

    return (
      <form>
        {/* { editorMode && this.handleEditorMode() } */}
        <label htmlFor="value">
          Valor:
          <input
            type="text"
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
        { editorMode
          ? (
            <button
              type="submit"
              onClick={ handleEdit }
            >
              Editar despesa
            </button>
          )
          : (
            <button
              type="submit"
              onClick={ handleSubmit }
              id={ id }
            >
              Adicionar despesa

            </button>
          )}
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editorMode: wallet.editorMode,
  editorId: wallet.editorId,
  editorExpense: wallet.editorExpense,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAcronym: (callBack, state) => dispatch(fetchCurrencies(callBack, state)),
  editExpen: (state) => dispatch(editExpense(state)),
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
