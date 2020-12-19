'use strict';

const Hapi = require('@hapi/hapi');
const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://qaninja:qaninja@cluster0.sh0fn.mongodb.net/zaplinkdb?retryWrites=true&w=majority'

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected');
})

mongoose.connection.on('erro', (error) => {
    console.log('MongoDB give stick, bicho, se liga ai:  ' + error);
})

const contactRoutes = require('./routes/contact.routes')

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: {
            origin:['*']
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return { message: 'Welcome to zaplink API', company: 'QA Nija', course: 'DevTester' };
    }
});
server.route(contactRoutes)


server.start((err)=>{

    if(err){
        throw err;
    }
    console.log('Server running on %s', server.info.uri);
});



process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

exports.init = async ()=>{    
    
    return server;
}