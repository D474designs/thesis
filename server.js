var express        = require('express'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    morgan         = require('morgan'),
    routes         = require('./backend'),
    api            = require('./backend/api');

var app = module.exports = express();
var port = '1337';

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/'));
app.use('/build', express.static('public'));

var env = process.env.NODE_ENV;
if ('development' == env) {
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
}

if ('production' == app.get('env')) {
  app.use(errorHandler());
}

app.get('/', routes.index);
app.all('/api/events', api.events);
app.all('/api/events/:eventId', api.event)

app.listen(port);
console.log('Listening on port ' + port + '...');
