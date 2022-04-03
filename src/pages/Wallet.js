import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, getCurrencies } from '../actions';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';

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
class Wallet extends Component {
  componentDidMount() {
    const { fetchAcronym } = this.props;

    fetchAcronym(getCurrencies);
  }

  renderTableHeader = () => TABLE_HEADERS
    .map((header) => <th key={ header }>{ header }</th>)

  render() {
    const { email, total } = this.props;

    return (
      <div>
        <Header email={ email } total={ total } />
        <ExpensesForm />
        <table>
          <thead>
            <tr key="">
              { this.renderTableHeader() }
            </tr>
          </thead>
          <tbody>
            <tr key="">
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  total: wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAcronym: (callBack) => dispatch(fetchCurrencies(callBack)),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
