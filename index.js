const express = require('express'),http = require('http');
const hostname = 'localhost';
const port = 3000;
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const dishrouter = require('./routes/dishrouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const mongoose  = require('mongoose');
const dishes = require('./models/dishes');
const url = 'mongodb://127.0.0.1:27017/thebeast';
const connect = mongoose.connect(url);

connect.then((db)=> {
  console.log("connected to the server"); 
} , (err) => {
  console.log(err);
});

app.use('/dishes',dishrouter);
app.use('/leader',leaderRouter);
app.use('promotions',promoRouter);
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(express.static(__dirname + 'public'));
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');      
  });
  

http.createServer(app).listen(port,hostname, () =>{
    console.log('Server running at http://%s:%s',hostname,port);
});