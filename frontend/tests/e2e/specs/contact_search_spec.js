describe('Buscar', ()=>{
    const contact =  {
        name:'Teste de busca',
        number:'41 123456789',
        description:'Teste de busca de contato'
    }

    describe(`Quando busco pelo contato ${contact.name}`, ()=>{
        before(()=>{
            cy.dash()
            cy.searchContact(contact.number)
        })
        it('Devo ver somente este contato no dashboard',()=>{
            cy.contactItem().should('have.length',1)
            cy.contactItem().contains(contact.name)
            cy.contactItem().contains(contact.description)

        })
    })
})