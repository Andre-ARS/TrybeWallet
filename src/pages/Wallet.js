import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, getCurrencies } from '../actions';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';

class Wallet extends Component {
  componentDidMount() {
    const { fetchAcronym } = this.props;

    fetchAcronym(getCurrencies);
  }

  render() {
    const { email, total } = this.props;

    return (
      <div>
        <Header email={ email } total={ total } />
        <ExpensesForm />
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
