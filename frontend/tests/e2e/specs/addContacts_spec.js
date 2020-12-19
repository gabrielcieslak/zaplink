// class DashPage{
//     create(contact){
//         
//         cy.get('#addNewContact').click()
//         cy.get('.input-name input').type(contact.name)
//         cy.get('.input-number input').type(contact.number)
//         cy.get('.text-description textarea').type(contact.description)
//         cy.get('#saveButton').click()
//     }
// } modelo de custom action para execução




describe('Cadastro de contatos', () => {
    describe('Novo contato', () => {
        let contact = {
            name: 'Teste Cypress',
            number: '41999999999',
            description: 'Teste automatizado de criação de contato'
        }
        describe('Quando submeto o cadastro completo', () => {
            before(() => {
                cy.dash()
                cy.createContact(contact)
                // dash.create(contact) todo o código do dash.create substitui o passo a passo aqui           
            })
            it('Deve cadastrar esse contato', () => {
                cy.contactList().contains(contact.name)
            })
        })
        describe('Quando submeto o cadastro sem o nome', () => {
            let contact ={
                number:'41999999999',
                description:'Teste automatizado de criação de contato'
            }
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })
            it('Deve mostrar uma notificação de nome invalido', () => {
                cy.nameError().contains('Nome inválido')

            })
        })
        describe('Quando submeto o cadastro sem o número', () => {
            let contact ={
                name:'Teste Cypress', 
                description:'Teste automatizado de criação de contato'
            }
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })
            it('Deve mostrar uma notificação de número invalido', () => {
                cy.numberError().contains('Número inválido')
            })
        })
        describe('Quando submeto o cadastro sem o assunto', () => {
            let contact ={
                name:'Teste Cypress', 
                number:'41999999999',
            }
            before(() => {
                cy.dash()
                cy.createContact(contact)
            })
            it('Deve mostrar uma notificação de assunto inválido', () => {
                cy.descriptionError().contains('Assunto deve conter ao menos 10 caracteres')
            })
        })
    })
})