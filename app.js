//Core Modules
var http            = require('http');
var path            = require('path');

//Basic Dependencies
var express         = require('express');

//required express 4 middleware
var compression     = require('compression');

//view engine
var expressHandlebars       = require( 'express3-handlebars' );

var app = express();

// setting mime types for webfonts and other things
express.static.mime.define( { 'application/x-font-woff': [ 'woff' ] } );
express.static.mime.define( { 'application/x-font-ttf': [ 'ttf' ] } );
express.static.mime.define( { 'application/vnd.ms-fontobject': [ 'eot' ] } );
express.static.mime.define( { 'font/opentype': [ 'otf' ] } );
express.static.mime.define( { 'image/svg+xml': [ 'svg' ] } );

app.disable( 'X-Powered-By' ); //SITE SECURITY: this way people cant see that we are using express.js and exploit its vulnerabilities
app.use( compression() ); // gzipping
app.set( 'port', process.env.PORT || 5000 ); //setting port

// Configuring view engine
app.engine('.html', expressHandlebars({
	defaultLayout: 'master',
	extname: ".html"
}));
app.set('view engine', '.html');

app.use(express.static(path.join(__dirname, '/dist')));
app.use('/bower_components', express.static( __dirname + '/bower_components' ) );

app.get( '/', function( req, res ){
	res.render( 'index', {
		isProd: true
	});
});

http.createServer( app ).listen( app.get( 'port' ) );

console.log( 'Application listening to port:', app.get( 'port' ));
