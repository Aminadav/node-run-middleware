Error.stackTraceLimit = Infinity;

var express=require('express')
var app=express()

require('./index.js')(app)
app.get('/get-user/:id',function(req,res){
	console.log('req.cookies.cookie1:',req.cookies.cookie1)

	res.send({user:req.params.id,name:'Moyshale'})
})

app.runMiddleware('/get-user/20',{},function(code,data){
	console.log(code) // 200 
	console.log(data) // { user: '20', name: 'Moyshale' }
})

// Anoter test. Test Redirect */
app.get('/defaultRedirectCode',function(req,res){
	res.redirect("http://github.com")
})
app.get('/customRedirectCode',function(req,res){
	res.redirect(301,"http://github.com")
})


app.runMiddleware('/defaultRedirectCode',{},function(code,data,headers){
	console.log(code) // 301
	console.log(headers.location) // http://github.com
})

app.runMiddleware('/customRedirectCode',{},function(code,data,headers){
	console.log(code) // 301
	console.log(headers.location) // http://github.com
})

/* 
	Manual pass cookies to middleware
	Any property you pass to runMiddleware options argument, will be passed to the middleware request variable.

	In this example we passing cookies
*/
app.get('/see_cookie',function(req,res){
	// This route show cookie1
	res.send({cookie_status:req.cookies.cookie1})
})
app.runMiddleware('/see_cookie',{cookies:{cookie1:'this-is-the-cookie'}},function(code,data,headers){
	console.log(data) // it will be show 'this-is-the-cookie'	
})


/*
	For automatically pass all the arguments from current middleware,
	to other middleware, you can call `req.runMiddleware` inside a middleware
	As you can see, the module keep the cookies and the header
*/

app.get('/runItInsideMiddleware',function(req,res){
	console.log('we simulate a cookies from the client, and call to another middle ware');
	req.cookies.cookie1=true

	/* when executing req.runMiddleware: cookies & and other data will be forwarded by default */
	req.runMiddleware('/see_cookie',(code,data)=>{
		res.send(data) // The cookie will be true
	})
})

app.runMiddleware('/runItInsideMiddleware',function(code,data,headers){
	console.log(data) // it will be show true	
})

/* For more examples, and question, please use the issues tab in GitHub
	https://github.com/AminaG/node-run-middleware/issues
*/
