var http=require('http');



var loginPage=function(request,reply){
    console.log("Login Homepage: "+request.method);
	var context={
		hideNav:true
    }
    reply.view('login.html',context);
};

var homePagePost=function(request, reply){

    console.log("Home Page:"+request.body);
    request.body = '';
    request.on("readable", function(){        
        while (null !== (request.body += request.read())){}
    });

    // Do something with it
    request.on("end", function(){
        console.log(request.body); //-> POST Parameters as String
    });

    var options = {
      host: 'skillender.elasticbeanstalk.com',
      port: 80,
      path: '/rest/user/456',
      //+request.params.id
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

    //console.log("Home Page:"+request.method);
    var options = {
      host: 'skillender.elasticbeanstalk.com',
      port: 80,
      path: '/rest/user/456',
	  //+request.params.id
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




var searchPage=function(request,reply){
    var context={
        searchKey:request.params.searchKey
    }
    reply.view('search.html',context);
}

var userhome=function(request,reply){
    reply.view('userhome.html');
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
        method:'POST',
        path:'/home/{id}',
        handler:homePagePost
    },

	{
        method:'GET',
        path:'/userhome',
        handler:userhome
    },
    {
        method:'GET',
        path:'/search/{searchKey}',
        handler:searchPage
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