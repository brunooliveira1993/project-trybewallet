import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { wallet, currencySelect } = this.props;

    const createElementName = (item) => {
      const moedas = Object.entries(item.exchangeRates);
      const select = moedas.find((element) => element[1].code === item.currency);
      return select[1].name;
    };

    const createElementCambio = (item) => {
      const moedas = Object.entries(item.exchangeRates);
      const select = moedas.find((element) => element[1].code === item.currency);
      const cambio = Number(select[1].ask);
      return cambio.toFixed(2);
    };

    const createElementConvert = (item) => {
      const moedas = Object.entries(item.exchangeRates);
      const select = moedas.find((element) => element[1].code === item.currency);
      const result = select[1].ask * item.value;
      return Number(result.toFixed(2));
    };

    return (
      <table>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Cambio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/excluir</th>
        {wallet.expenses.map((item) => (
          <tbody key={ item.id }>
            <tr>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>
                {item.value}
                .00
              </td>
              <td>{createElementName(item)}</td>
              <td>{createElementCambio(item)}</td>
              <td>{createElementConvert(item)}</td>
              <td>{currencySelect}</td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}
const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

Table.propTypes = {
  wallet: PropTypes.string.isRequired,
  currencySelect: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Table);
