
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require("fs");

var routes = require('./routes/index');
var fileupload = require('./routes/fileupload');
var fileupsave = require('./routes/filesave');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(bodyParser({uploadDir:'./tem_upload'}));
//app.use(bodyParser({ keepExtensions: true, uploadDir:'tem_upload' }));
app.use(require('connect-multiparty')());

app.use(logger('dev'));
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploadfiles')));

//fs.rename(tmp_path,new_path,function(err){
//  if(err){
//    console.log(err);
//  }
//  else
//  {
//    setTimeout(function () {
//      res.send('respond with a resource');
//    },10000);
//
//  }
//});





app.use('/', routes);
app.use('/fileupload', fileupload);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
