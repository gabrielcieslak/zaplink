const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const { init } = require('../server')

const { expect } = Code;
const { before, describe, it } = exports.lab = Lab.script();

describe('POST /contacts', () => {

    let resp;


    describe('Quando o Payload esta nulo', () => {
        before(async () => {
            var server = await init();   
            
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: null
            })
        })
        it('Deve retornar 400', async () => {
            expect(resp.statusCode).to.equal(400)
        })
       

    })
    

    describe('Quando o Payload esta correto', () => {
        before(async () => {
            var server = await init();
    
            let contact = {
                name: "betonera",
                number: "41 998732254",
                description: "Teste unitário"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 200', async () => {
            expect(resp.statusCode).to.equal(200)
        })

        it('Deve retornar o id do contato', async () => {
            console.log(resp.result.id)
            expect(resp.result._id).to.be.a.object()
            expect(resp.result.id.length).to.equal(24)
            // _id é um objeto do banco, enquanto id é uma string
            // para utilizar o expect como _id é necessário a conversão para string
            expect(resp.result._id.toString().length).to.equal(24)

        })

    })

    describe('Quando não existe nome',()=>{
        before(async () => {
            var server = await init();    
            let contact = {                
                number: "41 998732254",
                description: "Teste unitário"
            }    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Name is required')
        })

    })
    describe('Quando o nome esta em branco',()=>{
        before(async () => {
            var server = await init();    
            let contact = {
                name:"",                
                number: "41 998732254",
                description: "Teste unitário"
            }    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Name is required')
        })
    })

    describe('Quando o nome esta com menos de 3 caracteres',()=>{
        before(async () => {
            var server = await init();    
            let contact = {
                name:"aa",                
                number: "41 998732254",
                description: "Teste unitário"
            }    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Name is required')
        })
    })
    describe('Quando não existe número',()=>{
        before(async () => {
            var server = await init();    
            let contact = { 
                name:"Teste nome",               
                description: "Teste unitário"
            }    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Number is required')
        })
    })
    describe('Quando o número esta em branco',()=>{
        before(async () => {
            var server = await init();
    
            let contact = {
                name:"Teste número",                
                number: "",
                description: "Teste unitário"
            }    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Number is required')
        })
    })
    describe('Quando o número tem menos de 11 digitos',()=>{
        before(async () => {
            var server = await init();    
            let contact = {
                name:"Teste número",                
                number: "12345678",
                description: "Teste unitário"
            }    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Number is required')
        })

    })
    

    describe('Quando não existe Descrição',()=>{
        before(async () => {
            var server = await init();
    
            let contact = { 
                name:"Teste name",               
                number: "41 998732254"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Description is required')
        })

    })
    describe('Quando descrição esta em branco',()=>{
        before(async () => {
            var server = await init();
    
            let contact = {
                name:"Teste nome",                
                number: "41 998732254",
                description: ""
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Description is required')
        })

    })
    describe('Quando descrição tem menos de 10 carcteres',()=>{
        before(async () => {
            var server = await init();
    
            let contact = {
                name:"Teste nome",                
                number: "41 998732254",
                description: "123"
            }
    
            resp = await server.inject({
                method: 'post',
                url: '/contacts',
                payload: contact
            })
        })
        it('Deve retornar 409', async () => {
            expect(resp.statusCode).to.equal(409)
        })
        it('Deve retornar mensagem de campo em nulo', async()=>{
            expect(resp.result.message).to.equal('Description is required')
        })

    })

    

})

