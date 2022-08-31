import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sendEmailInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    senha: '',
    disabled: true,
  };

  validateEmail = (item) => {
    const email = /\S+@\S+\.\S+/;
    return (email.test(item));
  };

  onImputChange = (event) => {
    const number = 5;
    const { email, senha } = this.state;
    const { name, value } = event.target;
    const emailValidation = this.validateEmail(email);
    const senhaValidation = senha.length >= number;
    if (emailValidation === true && senhaValidation === true) {
      this.setState({ disabled: false });
    }
    if (emailValidation === false || senhaValidation === false) {
      this.setState({ disabled: true });
    }
    this.setState({ [name]: value });
  };

  render() {
    const { email, senha, disabled } = this.state;
    const { dispatch } = this.props;

    return (
      <div>
        <fildset>
          <p>Login</p>
          <input
            data-testid="email-input"
            type="text"
            onChange={ this.onImputChange }
            name="email"
            value={ email }
          />
          <p>Senha</p>
          <input
            data-testid="password-input"
            type="text"
            onChange={ this.onImputChange }
            name="senha"
            value={ senha }
            minLength="6"
          />
          <Link to="/carteira">
            <button
              type="submit"
              onClick={ () => dispatch(sendEmailInfo(this.state)) }
              disabled={ disabled }
            >
              Entrar

            </button>
          </Link>
        </fildset>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
