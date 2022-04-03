import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, getCurrencies, getTotal } from '../actions';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';

class Wallet extends Component {
  componentDidMount() {
    const { fetchAcronym, updateTotal } = this.props;

    fetchAcronym(getCurrencies);
    updateTotal();
  }

  render() {
    const { email, total, expenses } = this.props;

    return (
      <div>
        <Header email={ email } total={ total } />
        <ExpensesForm />
        <ExpensesTable expenses={ expenses } />
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
  updateTotal: () => dispatch(getTotal()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
