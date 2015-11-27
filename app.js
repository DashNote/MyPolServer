
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//////////////////////////////////////////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var mongodb = null;
MongoClient.connect('mongodb://localhost:27017/mypol',function(err,db){
	if (err) {
		console.log('error connecting:'+err.stack);
		return;
	}
	console.log("MongoDB Connected correctly to server");
	mongodb = db;
	assemblyInsert();
});
////////////////////////////////////////////////////////////////////

var fs = require('fs');
var path = './files/assemblymen.xml';

/*var xmlStr

fs.readFile(path, 'utf8',function(err, data) {
	console.log('data: '+ data);
	xmlStr = data;
	console.log(xmlStr);
});
*/
var data = fs.readFileSync(path, 'utf8');
//wait for the result, then use it
console.log(data);
var xmlText = data;
var X2JS = require('x2js');
var x2js = new X2JS();
var jsonObj = x2js.xml2js(data);
console.log(jsonObj);
//console.log(jsonObj.test.data.__cdata);
//console.log(jsonObj.test.simple);
/*
var xml2json = require("node-xml2json");
var jsonObj = xml2json.parser(data);
console.log('Obj: ' + jsonObj);
console.log(jsonObj);
*/
//==========================================================
var men = [];
men= null;
men = jsonObj.assemblymen.assemblyman;
console.log(jsonObj.assemblymen.assemblyman[0].assemblyman_id);
console.log(jsonObj.assemblymen.assemblyman[0].assemblyman_name);
checkMen();

function checkMen(){
		for(var i=0; i< men.length; i++){
	
		var menObj = men[i];
//		console.log('menObj:' + JSON.stringify(men[i]));
	}
}

//===========================================================

var jsonStr = JSON.stringify(jsonObj);
console.log('jsonStr: '+ jsonStr);
//console.log(jsonObj.profile); //객체일 경우 profile을 확인 가능

function assemblyInsert(){
	var assemblymen = mongodb.collection('assemblymen');
	assemblymen.insert(men, function(err, results){
		if(err) throw err;
		else{
			console.log('insert done');
		}
	});
}

/*
var assemblyman[];
assemblyman = jsonObj;
for(var i=0; i<assemblyman.length ; i++){
	var man = assemblyman[i];
	console.log(man); 
}

function check(json){
	if(json != null)
		for(var i=0; i<json.length ; i++){
			var assemblyman = json[i];
			console.log(assemblyman);
			}
	}
*/

