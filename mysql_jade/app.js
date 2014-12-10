var express = require('express');
var path = require('path');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host:'localhost',
  user:'launchpad',
  password:'launchpad'
});

connection.query('USE launchpad');

app.set('port',3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
  console.log('Inside Get');
  connection.query('select * from deploymentInfo', function(err,rows){
  if(err){
   throw err;
  }
  console.log(rows);
  res.render('test', {rows : rows});
 });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));
