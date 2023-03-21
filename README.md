Boas vindas ao repositório do projeto Trybe Wallet!
Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv rocket

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

Habilidades
Neste projeto, verificamos se voce é capaz de:

Criar um store Redux em aplicações React

Criar reducers no Redux em aplicações React

Criar actions no Redux em aplicações React

Criar dispatchers no Redux em aplicações React

Conectar Redux aos componentes React

Criar actions assíncronas na sua aplicação React que faz uso de Redux.

Requisitos do projeto
warning PULL REQUESTS COM ISSUES DE LINTER NÃO SERÃO AVALIADAS. warning

warning Os gifs são meramente ilustrativos para visualizar o fluxo da aplicação, os nomes devem seguir os requisitos e não o gif. warning

Lista de requisitos
Página de Login
Crie uma página para que a pessoa usuária se identifique, com email e senha. Esta página deve ser a página inicial de seu aplicativo.

image

1. Crie uma página inicial de login com os seguintes campos e características:
A rota para esta página deve ser ‘/’.

Você deve criar um local para que a pessoa usuária insira seu email e senha. Utilize o atributo data-testid="email-input" para o email e data-testid="password-input" para a senha.

Crie um botão com o texto ‘Entrar’.

O que será testado:

- A rota para esta página deve ser "/"
- Existe um local para que o usuário insira seu email e senha
- Existe um botão com o texto "Entrar"
2. Realize as seguintes verificações nos campos de email, senha e botão:
O email está no formato válido, como 'alguem@alguem.com'.

A senha possui 6 ou mais caracteres.

Salve o email no estado da aplicação, com a chave email, assim que a pessoa usuária logar.

A rota deve ser mudada para '/carteira' após o clique no botão 'Entrar'.

O que será testado:

- O botão de "Entrar" está desabilitado ao entrar na página
- O botão de "Entrar está desabilitado quando um email inválido é digitado
- O botão de "Entrar" está habilitado quando um email e uma senha válidos são passados
3. Utilize o Redux para salvar no estado global as informações da pessoa logada
Salve o email no estado da aplicação, com a chave email, assim que o usuário logar.

A rota deve ser mudada para /carteira quando o login for efetuado com sucesso.

O que será testado:

- O estado global possui a chave `email` no formato esperado
- A rota deve ser mudada para `/carteira` após o clique no botão
Página da Carteira
Crie uma página para gerenciar a carteira de gastos em diversas moedas, e que traga a despesa total em uma moeda só. Esta página deve ser renderizada por um componente chamado Wallet.

image
Configurando sua página
4. Crie uma página para sua carteira com as seguintes características:
A rota para esta página deve ser /carteira

O componente deve se chamar Wallet e estar localizado na pasta src/pages no arquivo Wallet.js

O que será testado:

- A rota para esta página deve ser "/carteira"
- O componente deve se chamar Wallet e estar localizado na pasta "src/pages"
Header (cabeçalho)
5. Crie um header para a página de carteira contendo as seguintes características:
Um elemento que exiba o email da pessoa usuária que fez login.

Adicione o atributo data-testid="email-field".
Dica: você deve pegar o email do estado global da aplicação (no Redux)
Um campo com a despesa total gerada pela lista de gastos.

Adicione o atributo data-testid="total-field".

Inicialmente esse campo deve exibir o valor 0

Um campo que mostre qual câmbio está sendo utilizado, que será neste caso será 'BRL'.

Adicione o atributo data-testid="header-currency-field".
O que será testado:

- Um elemento que exiba o email do usuário que fez login.
- Crie um campo com a despesa total gerada pela lista de gastos.
- Crie um campo que mostre que qual câmbio está sendo utilizado, que será neste caso "BRL"
Formulário de adição de Despesa
Dica: atente-se ao formato sugerido pelo React para criar formulários.

<form>
  <label>
    Nome:
    <input type="text" name="name" />
  </label>
</form>
6. Desenvolva um formulário para adicionar uma despesa contendo as seguintes características:
Um campo para adicionar valor da despesa.

O campo deverá ter a label Valor.
Um campo de texto para adicionar a descrição da despesa.

O campo deverá ter a label Descrição.
Um campo de select para adicionar em qual moeda será registrada a despesa.

O campo deverá ter a label Moeda.

O campo deverá ser um <select>.

As opções do select serão preenchidas através da consulta à API. Isso será feito em um requisito mais a frente. Nesse momento você pode deixar o <select> vazio.

Um campo para adicionar qual método de pagamento será utilizado.

O campo deverá ter a label Método de pagamento.

Este campo deve ser um <select>. A pessoa usuária deve poder escolher entre os campos: 'Dinheiro', 'Cartão de crédito' e 'Cartão de débito'.

Um campo para selecionar uma categoria (tag) para a despesa.

Este campo deve ser um <select>. A pessoa usuária deve poder escolher entre os campos: 'Alimentação', 'Lazer', 'Trabalho', 'Transporte' e 'Saúde'.

O campo deverá ter a label Tag.

7. Implemente a lógica para preencher as opções do campo "Moedas", buscando as siglas das moedas da API:
Ao entrar na página /carteira, você deverá fazer uma requisição para a API das moedas e preencher as opções do <select> de "Moedas" com os valores retornados. Utilizando as siglas das moedas.

As opções devem conter os valores: 'USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH' e 'XRP'.

Esses valores devem vir da API através do endpoint: https://economia.awesomeapi.com.br/json/all.

Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).
