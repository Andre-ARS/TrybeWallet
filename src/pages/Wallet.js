import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, getCurrencies, getTotal } from '../actions';
import ExpensesForm from '../components/ExpensesForm';
import Header from '../components/Header';
import ExpensesTable from '../components/ExpensesTable';
import EditForm from '../components/EditForm';
import './Wallet.css';

class Wallet extends Component {
  componentDidMount() {
    const { fetchAcronym, updateTotal } = this.props;

    fetchAcronym(getCurrencies);
    updateTotal();
  }

  render() {
    const { email, total, expenses, editorMode } = this.props;

    return (
      <div className="wallet">
        <Header email={ email } total={ total } />
        { editorMode ? <EditForm /> : <ExpensesForm /> }
        <ExpensesTable expenses={ expenses } />
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
  total: wallet.total,
  editorMode: wallet.editorMode,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAcronym: (callBack) => dispatch(fetchCurrencies(callBack)),
  updateTotal: () => dispatch(getTotal()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
