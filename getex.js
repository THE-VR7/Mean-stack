var express = require('express');
var app = express();
app.get('/summer.html', (req,res) => {
    res.sendFile(__dirname+"/"+"summer.html");
})
app.get('/process_get', function (req, res) {  
    response = {  
           first_name:req.query.first_name,  
           last_name:req.query.last_name  
       };  
       console.log(response);  
       res.end(JSON.stringify(response));  
    })
var server = app.listen(8000, ()=> {
    console.log("server is running");
})      