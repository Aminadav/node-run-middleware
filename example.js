Error.stackTraceLimit = Infinity;

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
/* For more examples, and question, please use the issues tab in GitHub
	https://github.com/AminaG/node-run-middleware/issues
*/
