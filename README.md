<!-- MarkdownTOC -->

- NodeJS run-middleware
	- Why?
	- Installtion
	- Support & Contributions
	- Change request paramaters
	- Auto pass cookies
	- Redirecting
	- Changelog
	- Examples
	- License

<!-- /MarkdownTOC -->

NodeJS module to execute your Express endpoints (middlewares) from your code. This module will let you laucnch manually
all your middleware. It is simulate a client calling to your rest API's. It is not using a network connection (Your server do not even needs to listen to a port)


#NodeJS run-middleware

[![npm](https://img.shields.io/npm/dt/run-middleware.svg?maxAge=2592000)](https://www.npmjs.com/package/run-middleware)
[![npm version](https://badge.fury.io/js/run-middleware.svg)](https://badge.fury.io/js/run-middleware)
[![Join the chat at https://gitter.im/node-run-middleware/Lobby](https://badges.gitter.im/node-run-middleware/Lobby.svg)](https://gitter.im/node-run-middleware/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/AminaG/node-run-middleware.svg?branch=master)](https://travis-ci.org/AminaG/node-run-middleware)

## Why?

Many times, your server, and your client, needs to execute the same functions. For example here is an endpoint to get user details:

	app.get('/get-user/:id',function(req,res){
		mysql.query('select * from users where id=?',[req.params.id],function(err,rows){
			res.send({user:rows[0]})
		})
	})	

Now your want to get the user details from your code. What should you do?

	app.runMiddleware('/get-user/20',function(code,body,headers){
		console.log('User Details:',body)
	})

---

## Installtion

	npm i -S run-middleware

	var express=require('express')	
	var app=express();
	require('run-middleware')(app)


## Support & Contributions
	
 - Pull requests, issues, and English proofreading are welcome in Github.
 - Question & support in StackOverflow using `run-middleware`tag.

---

## Change request paramaters

You can passing query string, body, cookies, and change the method.

	app.runMiddleware('/handler',{
			method:'post',
			query:{token:'tk-12345'},
			body:{"action":"list","path":"/"}
		},function(code,data){
			console.log(code,data)
			process.exit()
		})

## Auto pass cookies

When you can runMiddleware from another middleware, you can autopass all the parameters of the current middleware, by using the express `request` object.

	app.get('/middleware1',function(req,res){
		// We use res.runMiddleware instead of app.runMiddleware. All the cookies & other data (like socket.io session) will be pass to the second middle ware
		res.runMidleware(...)   
	})

## Redirecting

If the middleware you execute will redirect, you will be notified about it, by reading the `code` and the `headers.location`

	app.runMiddleware('/this-middleware-will-response-as-redirect',function(code,body,headers){
		if(code==301 || code=302) {// Redirect HTTP codes
			console.log('Redirect to:',headers.location)
		}
	})

## Changelog

- v0.6.1 (9 Sep 2016) - Supports response.redirect
- v0.6.2 (10 Sep 2016) - Supports passing cookies and other variables to runMiddleware
- v0.6.3 (11 Sep 2016) - Supports running middleware from others middleware, for automatically passing cookies and headers between middlewares.
- v0.6.4 (13 Sep 2016) - Better documentation and examples

## Examples

See example.js file for more info

## License

ISC License
Copyright (c) 2016, Aminadav Glickshtein

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
