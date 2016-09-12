New NodeJS Express module to direct call URL requests, for internal executing REST API's and to simulte requessts.


#NodeJS run-middleware module

[![npm](https://img.shields.io/npm/dt/run-middleware.svg?maxAge=2592000)](https://www.npmjs.com/package/run-middleware)
[![npm version](https://badge.fury.io/js/run-middleware.svg)](https://badge.fury.io/js/run-middleware)
[![Join the chat at https://gitter.im/node-run-middleware/Lobby](https://badges.gitter.im/node-run-middleware/Lobby.svg)](https://gitter.im/node-run-middleware/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## See this Example:
	var express=require('express')
	var app=express()

	require('./index.js')(app)
	app.get('/get-user/:id',function(req,res){
		res.send({user:req.params.id,name:'Moyshale'})
	})

	app.runMiddleware('/get-user/20',{},function(code,data){
		console.log(code) // 200 
		console.log(data) // { user: '20', name: 'Moyshale' }
	})


When developing Express NodeJS REST API's many times you need to call to one REST API's from another endpoint URL. For example, you have an API to get specific user by id

	app.get('/get-user/:id',function(req,res){
		/*
			DoSome MongoDB queries...()
		*/
		res.send(currentUser)
	})

Now your app need the call same API, from another API. What you usually do is moving the functions outside of the express midlleware

	app.get('/remove-user/:id',function(req,res){
		/*
			this API for work, need in the begining to get the user API
			What should I do?			
		*/
		/*
			getTheUser()
			Remove the user()
		*/

	}

The solution is:

	function get_user(id,callback){
		// get ther user
		callback(currentUser)
	}
	app.get('/get-user/:id',function(req,res){
		get_user(req.params.id,function(err,data){
			if(err)...
			else{
				res.send(currentUser)		
			}
		})
	})

	app.get('/remove-user/:id',function(req,res){
		get_user(req.params.id,function(err,data){
			if(err)...
			else{
				removeUser()
				res.send({ok:true})		
			}
		})
	})

---

This is working, but it will not be nice, to be able to call to one middleware from another? This is what this module do.


	app.get('/get-user:id',function(req,res){
		/*
			DoSome MongoDB queries...()
		*/
		res.send(currentUser)
	})

	app.get('/remove-user:id',function(req,res){
		app.runMidlleware('/get-user/533',{},function(err,data){
			if(err)...
			else{
				removeUser()
				res.send({ok:true})		
			}
		})
	})

---

## Installtion

	npm i -S run-middleware

## Use

	var express=require('express')	
	var app=express();

	require('run-middleware')(app)

## License

	Choose whatever you like MIT/GPL/GNU. I don't give you any warrany.

## Support & Contributions
	
	Pull requests, issues, and English proofreading are welcome.

---

## Advance use

**How to post and attach query parameters**

	app.runMiddleware('/handler',{
			method:'post',
			query:{token:'tk-12345'},
			body:{"action":"list","path":"/"}
		},function(code,data){
			console.log(code,data)
			process.exit()
		})


## Changelog

- v0.6.1 (12 Sep 2016) - Supports response.redirect

## Examples

See example.js file for more info
