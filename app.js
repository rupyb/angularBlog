var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');
let validator = require('validator');

mongoose.connect('mongodb://test:test123@ds237574.mlab.com:37574/linkedinapis', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: 'Please enter a first name'
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: String
});

var userModel = mongoose.model('user', userSchema );

const blogSchema = new Schema({
    title: String,
    content: String,
    author: String,
    comments: [
        {
            person: String,
            content: String
        }
    ]
});
var blogModel = mongoose.model('blog', blogSchema );

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist/blogapp')));


// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.get('*', (req, res, next) => {
//     res.sendFile(path.join(__dirname, 'dist/blogapp'));
// });
app.get('/stuff', (req, res, next) => {
    res.json('success');
});

app.post('/stuff', (req, res, next) => {
    console.log('hit the post', req.body);
    const newUser = new userModel(req.body);
    newUser.save().then(record => console.log('new record',record)).catch(err => {
        console.error(err);
    });
    res.json('got post');
});

app.post('/signIn', (req, res, next) => {
    console.log('hit the post', req.body);
    userModel.find({email:req.body.email, password: req.body.password})
        .then(data => res.json(data))
        .catch(err => {
            console.error(err);
            res.json(err);
        });
    
});

app.get('/blog', (req, res, next) => {
    
    blogModel.find({})
        .then(data => res.json(data))
        .catch(err => {
            console.error(err);
            res.json(err);
        });
    
});

app.post('/blog', (req, res, next) => {
    console.log(req.body);
    console.log('hit post');
    const newPost = new blogModel(req.body);
    newPost.save().then(record => console.log('new record',record)).catch(err => {
        console.error(err);
    });
    res.json('got post');
});

app.get('*', function(req, res) {
    res.sendfile(path.join(__dirname, 'dist/blogapp/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});




userModel.find({}).then(data => {
    console.log(data);
    console.log(path.join(__dirname));
    
});
module.exports = app;
