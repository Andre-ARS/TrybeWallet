import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import Logo from '../../images/money-logo.png';
import './style.css';

class Header extends Component {
  render() {
    const { props: { email, total } } = this;

    return (
      <header className="header-container">
        <img src={ Logo } alt="" className="header-logo" />
        <div>
          <p data-testid="email-field">{ email }</p>
          <span data-testid="total-field">
            { total > 0 ? total : 0 }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(object),
}.isRequired;

export default Header;
