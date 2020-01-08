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
var passport = require('passport');
var authenticate = require('./authenticate')

//app.use(cookie-parser('12345-67890-09876-54321'));
app.use(session({
name: 'session-id',
secret: '12345-67890-09876-54321',
saveUninitialized: false,
resave: false,
store: new FileStore()
})); 

app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter);
app.use('/users',usersRouter);

function auth(req,res,next) {

  if(!req.user)
  {
    var err = new Error('You are not authenticated');
    res.setHeader('WWW-Authenticate','Basic');
    err.status = 401;
    return next(err);
  }
else {
    next();
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

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(err.message);
});
  

http.createServer(app).listen(port,hostname, () =>{
    console.log('Server running at http://%s:%s',hostname,port);
});

