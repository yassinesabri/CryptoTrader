var express = require('express');
var app = module.exports = express.Router();
const Poloniex = require('poloniex-api-node');
var poloniex = new Poloniex();
app.get('/ticker',function(req, res, next){
    poloniex.returnTicker(function(err, ticker) {
        if(err){
            return res.json({"success" : false,"err" : err});
        }
        res.status(200).send({"success" : true,"result" : ticker});
    });
});
app.get('/tradehistory&:pair&:start&:end',function(req,res,next){
    poloniex.returnTradeHistory(req.params.pair, req.params.start, req.params.end, function(err,history){
      if(err){
            return res.json({"success" : false,"err" : err});
        }
        res.status(200).send({"success" : true,"result" : history});
    });
});
app.get('/orderbook&:pair&:depth',function(req,res,next){
    poloniex.returnOrderBook(req.params.pair, req.params.depth, function(err,book){
      if(err){
            return res.json({"success" : false,"err" : err});
        }
        res.status(200).send({"success" : true,"result" : book});
    });
});
app.get('/chartdata&:pair&:period&:start&:end',function(req,res,next){
    poloniex.returnChartData(req.params.pair,req.params.period,req.params.start,req.params.end, function(err,chart){
      if(err){
            return res.json({"success" : false,"err" : err});
        }
        res.status(200).send({"success" : true,"result" : chart});
    });
});
app.get('/balances&:apiKey&:secretKey',function(req,res,next){
    poloniexTrade = new Poloniex(req.params.apiKey,req.params.secretKey);
    poloniexTrade.returnBalances(function(err,balences){
        if(err){
            return res.json({"success" : false,"err" : err});
        }
        res.status(200).send({"success" : true,"result" : balences});
    });
});

