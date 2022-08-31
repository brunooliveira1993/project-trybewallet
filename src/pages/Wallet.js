import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getWalletApi, newEntreisWalletApi,
  sendCurrencies, substitutEntreisWalletApi } from '../redux/actions';
import Table from '../components/Table';

const DEFALT_TAG = 'Alimentação';

class Wallet extends React.Component {
  state = {
    id: 0,
    value: '',
    description: '',
    method: 'Dinheiro',
    tag: DEFALT_TAG,
    currency: 'USD',
    arr: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await getWalletApi();
    const arr = [];
    Object.keys(data).forEach((item) => arr.push(item));
    arr.splice(1, 1);
    dispatch(sendCurrencies(arr));
    this.setState({ arr });
    return arr;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  dispatchNewEntries = (state) => {
    const { id } = this.state;
    const idValue = 1;
    const newVelue = id + idValue;
    const { dispatch } = this.props;
    dispatch(newEntreisWalletApi(state));
    this.setState({
      id: newVelue,
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: DEFALT_TAG,
      currency: 'USD',
    });
  };

  dispatchSubstitutEntries = (state) => {
    const { wallet, dispatch } = this.props;
    const teste = {
      ...state,
      id: Number(wallet.idToEdit),
    };
    dispatch(substitutEntreisWalletApi(teste));
    const { id } = this.state;
    const idValue = 1;
    const newVelue = id + idValue;
    this.setState({
      id: newVelue,
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: DEFALT_TAG,
      currency: 'USD',
    });
  };

  render() {
    const { user, wallet } = this.props;
    const {
      value,
      description,
      method,
      tag,
      currency,
      arr,
    } = this.state;

    return (
      <div>
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
            {wallet.total}
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
          <fieldset>
            Valor:
            <input
              data-testid="value-input"
              type="number"
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
              {arr.map((item) => (
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
          {
            wallet.editor
              ? (
                <button
                  type="button"
                  onClick={ () => (this.dispatchSubstitutEntries(this.state)) }
                >
                  Editar despesa
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={ () => (this.dispatchNewEntries(this.state)) }
                >
                  Adicionar despesa
                </button>
              )
          }
        </header>
        <section>
          <Table currencySelect={ currency } />
        </section>
      </div>
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
