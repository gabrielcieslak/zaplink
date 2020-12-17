const contactModel = require('../models/contact.model')

module.exports = {
    async list(request, h) {
        const contacts = await contactModel.find().exec();
        return contacts;
    }
}