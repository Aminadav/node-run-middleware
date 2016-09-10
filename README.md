New NodeJS Express module to simulate URL requests, for internal executing REST API's

## Description

When developing Express NodeJS REST API's many times you need to call to one REST API's from another endpoint URL. For example, you have an API to get specific user by id

	app.get('/get-user:id',function(req,res){
		/*
			DoSome MongoDB queries...()
		*/
		res.send(currentUser)
	})

Now your APP need the same API. What you usually do is moving the functions outside of the express midlleware

	app.get('/remove-user:id',function(req,res){
		/*
			this API to work, need in the begining to get the user API
			What should I do?
		*/
	}

The solution is:

	function get_user(id,callback){
		// get ther user
		callback(currentUser)
	}
	app.get('/get-user:id',function(req,res){
		get_user(function(err,data){
			if(err)...
			else{
				res.send(currentUser)		
			}
		})
	})

	app.get('/remove-user:id',function(req,res){
		get_user(function(err,data){
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

## Support
	
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


See example.js file for more info