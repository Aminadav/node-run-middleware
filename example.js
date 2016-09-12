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

/* For more examples, and question, please use the issues tab in GitHub
	https://github.com/AminaG/node-run-middleware/issues
*/
