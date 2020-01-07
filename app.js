const express = require('express'),http = require('http');
const hostname = 'localhost';
const port = 3000;
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);

//app.use(cookie-parser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
})); 

app.use('/',indexRouter);
app.use('/users',usersRouter);
function auth(req,res,next) {
console.log(req.session);
  if(!req.session.user)
  {
    var err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
 
  }
else {
  if (req.session.user === 'authenticated') {
    console.log('req.session: ',req.session);
    next();
}
else {
    var err = new Error('You are not authenticated!');
    err.status = 401;
    next(err);
}
}  
}

app.use(auth);


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
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use('/dishes',dishrouter);
app.use('/leader',leaderRouter);
app.use('promotions',promoRouter);
app.use(express.static(__dirname + 'public'));
app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');      
  });
  

http.createServer(app).listen(port,hostname, () =>{
    console.log('Server running at http://%s:%s',hostname,port);
});