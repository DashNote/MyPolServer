
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var Parse = require('parse/node').Parse;
Parse.initialize("wucQ2VqODSKz7D1uDiLKxiD00j4x7RJ9n8yHY96T", "rnqRoLXpzXS55jcizn34NH7uc2B2u4JkxUe4GucP");

//var Parse = require('node-parse-api').Parse;
/*
var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save(men).then(function(object) {
  //var msgbox = Windows.UI.Popups.MessageDialog("yay! it worked");
  //return msgbox.showAsync();
});
*/
/*
var options = {
		app_id:'wucQ2VqODSKz7D1uDiLKxiD00j4x7RJ9n8yHY96T',
		api_key:'rnqRoLXpzXS55jcizn34NH7uc2B2u4JkxUe4GucP'
}

var parse = new Parse(options);

parse.insert('Foo', { foo: 'bar' }, function (err, response) {
	  console.log(response);
	});
*/
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
/*
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
*/
////////////////////////////////////////////////////////////////////
/*
var Assemblymen = Parse.Object.extend("Assemblymen");
var assemblymen = new Assemblymen();
//assemblymen.set("name", "홍길동");
//assemblymen.add(men);
//assemblymen = men;
//assemblymen.set("assemblymen", men);
console.log('assemblymen: '+ assemblymen);

assemblymen.save(null, {
	success: function(assemblymen){
		console.log('The object was saved successfully');
	}, 
	error: function(assemblymen, error){
		console.log('The save failed');
	}
});
*/
//assemblySave();
/*
var query = new Parse.Query(Parse.User);
query.find({
  success: function(users) {
    for (var i = 0; i < users.length; ++i) {
      console.log(users[i].get('username'));
    }
  }
});
*/
//////////////////////////////////////////////////////////////////////
var fs = require('fs');
var path = './files/assemblymen.xml';

//=======================================================
/*
var xmlStr

fs.readFile(path, 'utf8',function(err, data) {
	console.log('data: '+ data);
	xmlStr = data;
	console.log(xmlStr);
});

var data = fs.readFileSync(path, 'utf8');
//wait for the result, then use it
//console.log(data);
var xmlText = data;
var X2JS = require('x2js');
var x2js = new X2JS();
var jsonObj = x2js.xml2js(data);
//var jsonObj = x2js.xml_str2json(data);
console.log(jsonObj);
//console.log(jsonObj.test.data.__cdata);
//console.log(jsonObj.test.simple);
//var xmlDocStr = x2js.js2xml(jsonObj);
//console.log('xmlDoc: '+xmlDocStr);

var xml2json = require("node-xml2json");
var jsonObj = xml2json.parser(data);
console.log('Obj: ' + jsonObj);
console.log(jsonObj);

*/
//==========================================================

var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var arrObj = [];
arrObj = null;
fs.readFile(path, function(err, data) {
parser.parseString(data, function (err, arrObj) {
	if(arrObj != null){
		for(var i=0; i< arrObj.length; i++){
			var Assemblymen = Parse.Object.extend("Assemblymen");
			var assemblymen = new Assemblymen();
			var menObj = arrObj[i];
			assemblymen.set(menObj);
			assemblymen.save();
			console.log('jsonDoc: '+ menObj);
			console.log('jsonDoc saved');
		}}else{ throw err}
	})
//    console.dir('xml2js: ' + result);
//    console.log(result.assemblymen.assemblyman[0].assemblyman_name);
//    assemblySave(result);
//    jsonDoc = result;
//    return jsonDoc;
//    console.log('jsonDoc: ' + jsonDoc);
//    console.log('Done');
   
/*	
    if(result != null){
		for(var i=0; i< result.length; i++){
			var Assemblymen = Parse.Object.extend("Assemblymen");
			var assemblymen = new Assemblymen();
			var menObj = result[i];
			assemblymen.set(menObj);
			assemblymen.save();
			console.log('save done!')
		} 
		}else{
			console.log('err')}*/
//  assemblySave(result);
//  var xmlDocStr = x2js.js2xml(result);
//  console.log('xmlDocStr: '+xmlDocStr);
	});



//==========================================================
/*
var men = [];
men= null;
men = jsonObj.assemblymen.assemblyman;
console.log(jsonObj.assemblymen.assemblyman[0].assemblyman_id);
console.log(jsonObj.assemblymen.assemblyman[0].assemblyman_name);
//checkMen();

function checkMen(){
		for(var i=0; i< men.length; i++){
	
		var menObj = men[i];
//		console.log('menObj:' + JSON.stringify(men[i]));
	}
}
*/
//===========================================================
/*
var jsonStr = JSON.stringify(jsonObj);
//console.log('jsonStr: '+ jsonStr);
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
*/
//=============================================================
function assemblySave(arrObj){

	if(arrObj != null){
		for(var i=0; i< arrObj.length; i++){
			var Assemblymen = Parse.Object.extend("Assemblymen");
			var assemblymen = new Assemblymen();
			var menObj = arrObj[i];
			assemblymen.set(menObj);
			assemblymen.save();
			console.log('jsonDoc: '+ menObj);
			console.log('jsonDoc saved');
		}
		/*
			assemblymen.save(null, {
				success: function(menObj){
					console.log('sucess!'+ menObj.assemblyman_name);
				},
				error: function(err){
					console.log('fail!');
				}
			})
			*/
	}
/*			
			assemblymen.save(menObj, {
				success: function(menObj){
					console.log('sucess!'+ menObj.assemblyman_name);
				},
				error: function(err){
					console.log('fail!');
				}
			})
*///		console.log('menObj:' + JSON.stringify(men[i]));
		
	
/*	
	assemblymen.saveAll(men, {
		success: function(list){
			console.log('The object was saved successfully');
		}, 
		error: function(error){
			console.log('The save failed');
		}
	});
*/	
}
//assemblySave(jsonDoc);

//==============================================================


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

