Aplicação idealizada por Fernando Papito do curso DevTester na plataforma QA Ninja
Licença: MIT
Autor: Gabriel Cieslak
Alterações em regra de negócios, validações e design realizadas pelo autor.
Objetivo: Criação de teste E2E com cypress em um projeto construido em VUE e NODEjs
Testes realizados: API, Unitários, Funcionais, Não funcionais, Integração.
Ferramentas de desenvolvimento: YARN, @HAPI/HAPI, @HAPI/DEV, buefy,VUE e NODE.
Ferramentas de teste: Cypress, insomnia, @HAPI/LAB 
Ferramentas auxiliares: nodemon, Robo 3-T 
Banco de dados: MongoDB - Free version



Regras de negócio:
Dado que eu como usuário quero cadastrar um novo Contato com Nome
E Whatsapp
E Assunto
Então a aplicação deve registrar o novo contato no banco de dados

Devo ser capaz de inserir, buscar e excluir contatos.
Devo ser capaz de conversar com o contato via WhatsApp Web

Nome deve conter ao menos 3 caracteres
Número deve conter ao menos 11 caracteres
Assunto deve conter ao menos 10 caracteres
Os campos devem ser obrigatórios
Os campos não podem serem vazios

Textos de erro devem estar em vermelho




