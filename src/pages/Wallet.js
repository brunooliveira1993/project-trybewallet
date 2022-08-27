import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchWalletApi } from '../redux/actions';

class Wallet extends React.Component {
  state = {
    value: '',
    description: '',
    method: '',
    tag: '',
    currency: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWalletApi());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { user, wallet } = this.props;
    const {
      value,
      description,
      method,
      tag,
      currency,
    } = this.state;

    return (
      <header>
        <p data-testid="email-field">
          {' '}
          email:
          {' '}
          {user.email}
        </p>
        <br />
        <span>
          Despesa Total: R$
        </span>
        <span
          data-testid="total-field"
        >
          0
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
        <fieldset>
          Valor:
          <input
            data-testid="value-input"
            type="text"
            onChange={ this.handleChange }
            name="value"
            value={ value }
          />
          Descrição:
          <input
            value={ description }
            data-testid="description-input"
            type="text"
            onChange={ this.handleChange }
            name="description"
          />
          <select
            value={ currency }
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {wallet.currencies.map((item) => (
              <option
                key={ item }
                value={ item }
              >
                {item}

              </option>))}
          </select>
          <select
            value={ method }
            name="method"
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            value={ tag }
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </fieldset>
        <button type="button">Adicionar despesa</button>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

Wallet.propTypes = {
  wallet: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
