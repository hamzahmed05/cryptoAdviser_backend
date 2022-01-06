const api = require("lambda-api")


const ETHBTCBlockChain = require("./ETHBTC")
const post = require('./post')

// module.exports = (api, opts) => {

// };


module.exports.handler = (event, context, callback) => {
    // api.register()
      api.get('/',ETHBTCBlockChain);
      api.post('/', post )  
    // api.run(event, context, callback);
};