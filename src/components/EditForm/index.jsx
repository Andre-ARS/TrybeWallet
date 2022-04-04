import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import { connect } from 'react-redux';
import { editExpense } from '../../actions';

const METHODS_ARRAY = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const TAGS_ARRAY = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
class EditForm extends Component {
  constructor(props) {
    super(props);

    const { editorExpense } = this.props;
    this.state = editorExpense;
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
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
  }

  render() {
    const {
      props: { currencies },
      state: { value, currency, method, tag, description, id },
      handleChange,
      handleEdit,
    } = this;
    return (
      <form>
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
          onClick={ handleEdit }
          id={ id }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editorId: wallet.editorId,
  editorExpense: wallet.editorExpense,
});

const mapDispatchToProps = (dispatch) => ({
  editExpen: (state) => dispatch(editExpense(state)),
});

EditForm.propTypes = {
  currencies: PropTypes.arrayOf(string),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
