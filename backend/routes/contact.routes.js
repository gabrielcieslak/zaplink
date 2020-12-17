const contactController = require('../controllers/contact.controller')
module.exports = [
    {
        method: 'GET',
        path: '/contacts',
        handler: contactController.list
    }

]



