const contactModel = require('../models/contact.model')

module.exports = {
    async create(request, h){
        
        if(request.payload === null){
            return h.response({message:'Not JSon'}).code(400)
        }

        const contact= new contactModel({
            name:request.payload.name,
            number:request.payload.number,
            description:request.payload.description
        })        

        if(!contact.name || contact.name.length < 3)
            return h.response({message: 'Name is required'}).code(409)        
       
        if(!contact.number || contact.number.length < 9)
            return h.response({message: 'Number is required'}).code(409)       
        
        
        
        if(!contact.description || contact.description.length < 4)
            return h.response({message:'Description is required'}).code(409)           
        
        try {
            let result = await contact.save()
            return h.response(result).code(200);
            
        } catch (error) {
            return h.response(error).code(500)
            
        }

       
    },
    
    async list(request, h) {
        const contacts = await contactModel.find().exec();
        return contacts;
    }
}