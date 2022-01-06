const api = require('lambda-api')

module.exports.handler = async (event, context, callback) => {
    
    try{
        console.log("EVENT", event)    
        return{ statusCode:200, body: event}
        
    } catch(error){
        console.log("error while retrieving", error)
        return {statusCode: 400,body: error.message}
    }
}