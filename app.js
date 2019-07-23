var createError = require('http-errors');
var express = require('express');
var path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/api/users');
const session = require('express-session');

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

var app = express();
app.use(cors());

app.use(cookieParser());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Express session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// require('./models/users');
// require('./config/passport');
app.use(require('./routes'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false
	})
);

mongoose.set('useCreateIndex', true);

mongoose.set('useCreateIndex', true);
var DB_uri = 'mongodb+srv://justin:i6VYUgJyTogvAmcJ@cluster0-qodv0.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(DB_uri, { useNewUrlParser: true });
// require('./models/users');

mongoose.connection.once('open', () => {
	console.log(`mongoose version: ${mongoose.version} [Connected]`);
});

// app.use(express.static(path.join(__dirname, '../src/index.html')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

var corsOptions = {
	optionsSuccessCode: 200
};

app.use('/api/pokemon', cors(corsOptions), require('./routes/api/pokemon'));

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

module.exports = app;
