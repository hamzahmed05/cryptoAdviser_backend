const axios = require('axios');
const api = require('lambda-api')()

module.exports.handler = async (event, context, callback) => {
    
    //  api.run(event, context, callback);
    
    try{
        let coinBaseETHbidPrice, coinBaseETHaskPrice, coinBaseBTCbidPrice, coinBaseBTCaskPrice
        let urlETH = "https://api.blockchain.com/v3/exchange/l3/ETH-USD"
        let urlBTC ="https://api.blockchain.com/v3/exchange/l3/BTC-USD"
        
        let ethRes = await axios.get(urlETH)
        let btcRes= await axios.get(urlBTC)
        
        let coinBaseresponseBTCsell = await axios.get("https://api.coinbase.com/v2/prices/BTC-USD/sell")
        let coinBaseresponseBTCbuy = await axios.get("https://api.coinbase.com/v2/prices/BTC-USD/buy")
        let coinBaseresponseETHbuy = await axios.get("https://api.coinbase.com/v2/prices/ETH-USD/buy")
        let coinBaseresponseETHsell = await axios.get("https://api.coinbase.com/v2/prices/ETH-USD/sell")
        
        console.log("===> ", btcRes)
        
        
        let ETHbidPrice = ethRes.data.bids[0].px
        let ETHaskPrice = ethRes.data.asks[0].px
        let BTCbidPrice = btcRes.data.bids[0].px
        let BTCaskPrice = btcRes.data.asks[0].px
        
        coinBaseBTCaskPrice = coinBaseresponseBTCsell.data.data.amount
        coinBaseBTCbidPrice = coinBaseresponseBTCbuy.data.data.amount
        coinBaseETHaskPrice = coinBaseresponseETHsell.data.data.amount
        coinBaseETHbidPrice = coinBaseresponseETHbuy.data.data.amount
        
        return{
            statusCode:200,
            body:{ETHbidPrice,ETHaskPrice, BTCaskPrice, BTCbidPrice, coinBaseETHbidPrice, coinBaseETHaskPrice, coinBaseBTCbidPrice, coinBaseBTCaskPrice}
        }
        
    } catch(error){
        console.log("error while retrieving", error)
        return {statusCode: 400,body: error.message}
    }
};

    