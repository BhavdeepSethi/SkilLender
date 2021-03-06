var http=require('http');



var loginPage=function(request,reply){
    console.log("At Homepage");
	var context={
		hideNav:true
    }
    reply.view('login.html',context);
};

var homePagePost=function(request, reply){    
    
    var fullBody = '';
    
    request.on('data', function(chunk) {
      // append the current chunk of data to the fullBody variable
      fullBody += chunk.toString();
    });
    
    request.on('end', function() {
    
      // request ended -> do something with the data
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      
      // parse the received body data
      var decodedBody = querystring.parse(fullBody);
      console.log("Body: "+decodedBody);
  });

    
    var options = {
      host: 'skillender.elasticbeanstalk.com',
      port: 80,
      path: '/rest/user/'+request.params.id,
      //+request.params.id
	  //1
      method: 'GET',
      headers:{
        contentType:'application/json'  
      }
      
    };

    var responseOut;
    var req = http.request(options, function(res) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      var data='';
      res.on('data', function (chunk) {
      data += chunk;
        //console.log('BODY: ' + data);
        //console.log(typeof  data);
      });
        
        res.on('end', function(){
        responseOut = JSON.parse(data);
        //console.log("here");
        //var name=user.name;
        
        //console.log( responseOut.user.name, responseOut.user.id);
        reply.view('home.html',responseOut.user);
        });
      
    });
    req.end();
    //console.log("Test:"+responseOut)
    
};

var homePage=function(request,reply){

    console.log(request.params.id);
    var options = {
      host: 'skillender.elasticbeanstalk.com',
      port: 80,
      path: '/rest/user/'+request.params.id,	  
      method: 'GET',
      headers:{
        contentType:'application/json'  
      }
      
    };

    var responseOut;
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
	  var data='';
      res.on('data', function (chunk) {
	   data += chunk;        
      });
		
      res.on('end', function(){
        responseOut = JSON.parse(data);				
		reply.view('home.html',responseOut.user);
       });
	  
    });
    req.end();
	//console.log("Test:"+responseOut)    
};



var searchQuery=function(request,reply){
    var options = {
      host: 'skillender.elasticbeanstalk.com',
      port: 80,	  
	  path:'/rest/search/user/'+request.params.id+'/'+request.params.skill+"/1",
      //path: '/rest/search/user/3/s2/1',
      //+request.params.id
      method: 'GET',
      headers:{
        contentType:'application/json'  
      }
      
    };    

    var queryRes;
    var req = http.request(options, function(res) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      var data='';
      res.on('data', function (chunk) {
      data += chunk;
        //console.log('BODY: ' + data);
        //console.log(typeof  data);
      });
      res.on('end', function(){
        queryRes = JSON.parse(data);
        queryRes.searchQuery=request.params.skill;
        queryRes.id=request.params.id;


        console.log(JSON.stringify(queryRes));
        //var name=user.name;
        
        //console.log( responseOut.user.name, responseOut.user.id);
        reply.view('search.html', queryRes);
       });
      
    });
    req.end();    
};


var userhome=function(request,reply){
    console.log(request.params.id);
    var options = {
      host: 'skillender.elasticbeanstalk.com',
      port: 80,
      path: '/rest/user/'+request.params.id,      
      method: 'GET',
      headers:{
        contentType:'application/json'  
      }
      
    };

    var responseOut;
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      var data='';
      res.on('data', function (chunk) {
        data += chunk;
      });
        
      res.on('end', function(){
        responseOut = JSON.parse(data);             
        reply.view('userhome.html',responseOut.user);
       });
      
    });
    req.end();    
};


var connections=function(request,reply){
    reply.view('connections.html', request.params);
};


module.exports=[
    {
        method:'GET',
        path:'/',
        handler:loginPage
    },
    {
        method:'GET',
        path:'/home/{id}',
        handler:homePage
    },
	{
        method:'GET',
        path:'/userhome/{id}',
        handler:userhome
    },
    {
        method:'GET',
        path:'/search/{id}/{skill}',
        handler:searchQuery
    },
    {
        method:'GET',
        path: '/connections/{id}',
        handler: connections
    },
	
    {
        method:'GET',
        path:'/static/{path*}',
        handler:{
            directory:{
                path:'./static',
                listing:false,
                index:false
            }
        }
    }
	
]