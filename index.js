var _=require('lodash')

module.exports=function(app){

	if(app.runMiddleware) return /* Do not able to add as twice*/	
		
	app.runMiddleware=function(path,req,callback){	
	    if(callback) callback=_.once(callback)
	    var req=createReq(path,req)
	    var res=createRes(callback)    
	    app(req,res)
	}
	/* end - APP.runMiddleware*/
}

function createReq(path,options){
	if(!options) options={}
	var req= _.extend({
	    method:'GET',
	    host:'',
	    query:{},
	    url:path,
	    headers:{}
	},options)
	req.method=req.method.toUpperCase()
    // req.connection=_req.connection
    return req
}
function createRes(callback){
	var res={}
	// res=_.extend(res,require('express/lib/response'));

	var headers={}
	var code=200;
	res.setHeader=res.set=res.header=(x,y)=>{    	
		headers[x]=y
		headers[x.toLowerCase()]=y
		return res
	}
	// res.get=(x) => {
	// 	return headers[x]
	// }
	res.redirect = function(_code,url){
		if(!_.isNumber(_code)) {
			code=301
			url=_code
		}
		else{
			code=_code
		}
		res.setHeader('Location',url)
		res.end()
		// callback(code,url)
	}
	res.status=function(number){
		code=number
		return res
	}
	res.end=res.send=res.write=function(data){
	    if(callback)
	        callback(code,data,headers)
	    // else if (!options.quiet){
	    //     _res.send(data)
	    // }
	}
	return res
}