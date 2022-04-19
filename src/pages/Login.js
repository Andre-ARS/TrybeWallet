import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { addEmail } from '../actions';
import Logo from '../images/money-logo-green.png';
import './Login.css';

const MIN_PASSWORD_CHAR = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
      passwordType: 'password',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateLogin());
  }

  validateLogin = () => {
    const { password, email } = this.state;
    const validPassword = password.length >= MIN_PASSWORD_CHAR;
    const validEmail = EMAIL_REGEX.test(email);

    this.setState({ isDisabled: !(validEmail && validPassword) });
  }

  handleSubmit = (event) => {
    const { history: { push }, setUser } = this.props;
    const { email } = this.state;
    event.preventDefault();

    setUser(email);
    push('/carteira');
  }

  render() {
    const { state: {
      email,
      password,
      isDisabled,
      passwordType }, handleChange, handleSubmit } = this;

    return (
      <div className="login-form-container">
        <form className="form">
          <img src={ Logo } alt="" className="logo" />
          <input
            type="text"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ handleChange }
            className="input"
            placeholder="Digite o seu E-mail"
          />
          <div>
            <input
              type={ passwordType }
              data-testid="password-input"
              name="password"
              value={ password }
              onChange={ handleChange }
              className="input password"
              placeholder="Digite sua Senha"
            />
            { passwordType === 'password'
              ? (
                <FaEye
                  onClick={ () => this.setState({ passwordType: 'text' }) }
                  className="eyes"
                />
              )
              : (
                <FaEyeSlash
                  onClick={ () => this.setState({ passwordType: 'password' }) }
                  className="eyes"
                />
              ) }
          </div>
          <button
            type="submit"
            disabled={ isDisabled }
            onClick={ handleSubmit }
            className="login-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  history: PropTypes.objectOf(),
  setUser: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
