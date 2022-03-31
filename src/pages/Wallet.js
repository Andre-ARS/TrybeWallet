import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';

class Wallet extends Component {
  componentDidMount() {
    const { fetchAcronym } = this.props;

    fetchAcronym();
  }

  render() {
    const { email } = this.props;

    return (
      <main>
        <header>
          <h1>trybeWallet</h1>
          <p data-testid="email-field">{ email }</p>
          <span data-testid="total-field">
            0
            <span data-testid="header-currency-field">BRL</span>
          </span>
        </header>
      </main>
    );
  }
}

const mapStateToProps = ({ user }) => ({ email: user.email });

const mapDispatchToProps = (dispatch) => ({
  fetchAcronym: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
