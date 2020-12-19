// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("dash",()=>{
    cy.visit('dashboard')
})
Cypress.Commands.add("createContact", (contact) => { 
    cy.get('#addNewContact').click()
    if(contact.name) cy.get('.input-name input').type(contact.name)
    if(contact.number) cy.get('.input-number input').type(contact.number)
    if(contact.description) cy.get('.text-description textarea').type(contact.description)
    cy.get('#saveButton').click()
})
Cypress.Commands.add("contactList",()=>{
    return cy.get('.contact-list')
})
Cypress.Commands.add("nameError",()=>{
    return cy.get('.input-name small')
})
Cypress.Commands.add("numberError",()=>{
    return cy.get('.input-number small')
})
Cypress.Commands.add("descriptionError",()=>{
    return cy.get('.text-description small')
})