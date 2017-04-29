var logger = require('morgan'),
cors = require('cors'),
http = require('http'),
express = require('express'),
errorhandler = require('errorhandler'),
bodyparser = require('body-parser'),
bufferUtil = require('bufferutil');
helmet = require('helmet');


var app = express();
app.use(helmet());
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());
app.use(cors());
if(process.env.NODE_ENV === 'development'){
    app.use(logger('dev'));
    app.use(errorhandler());
}
var port = process.env.PORT || 3010;
app.use(require('./routers')); //API routers

http.createServer(app).listen(port,function(err) {
    console.log('listening in http:localhost:'+port);
});
