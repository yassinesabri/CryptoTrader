var express = require('express');
var app = module.exports = express.Router();
var apiKey = "FEP2GU36-66H13OOV-3BNN10D1-SPVHZ755";
var secretKey = "f2577bcbe5e3570010bacaa8eb1d486dc7a1faf3418ed6db6678902ed3491368301298d3fdff7d86998e4cc96ccfaa289321044a02f463da0661d415f411cfe8";
const Poloniex = require('poloniex-api-node');
var poloniex = new Poloniex(apiKey,secretKey);
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
app.get('/balances',function(req,res,next){
  poloniex.returnBalances(function(err,balences){
    if(err){
      return res.json({"success" : false,"err" : err});
    }
    res.status(200).send({"success" : true,"result" : balences});
  });
});
