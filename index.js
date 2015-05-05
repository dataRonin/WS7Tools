#!/usr/bin/env node
/**
 * Node.js back-end core
 * @author Fox Peterson (fox@tinybike.net)
 */

var express = require('express');
var express_io = require('express.io');
var errorhandler = require('errorhandler');
var longjohn = require('longjohn');
var _ = require('underscore');
var $ = require('jquery');
var sessions = require('sessions');
var flash = require('connect-flash');
var pg = require('pg');

var port = process.env.PORT || 3700;

// Configuration
longjohn.async_trace_limit = 25;

var app = express_io();
app.http().io();

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');
database_url = 'postgres://ws7:ws7@localhost/seven';

app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(app.router);

// Websocket listeners

app.listen(port)

// Routes

app.get("/", function (req, res) {
    res.render("page");
});

app.get('/plot', function(req, res){
    res.render('highstock');
});

app.io.route('plots', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query('SELECT DISTINCT ON (tmstamp) tmstamp, vanmet, primet, h15met, ws7 from airtemp ORDER BY tmstamp ASC', function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VANMET = [];
                var PRIMET = [];
                var H15MET = [];
                var WS7 = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        VANMET.push(Math.round(result.rows[i].vanmet*100)/100);
                        PRIMET.push(Math.round(result.rows[i].primet*100)/100);
                        H15MET.push(Math.round(result.rows[i].h15met*100)/100);
                        WS7.push(Math.round(result.rows[i].ws7*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VANMET: VANMET,
                        PRIMET: PRIMET,
                        H15MET: H15MET,
                        WS7: WS7,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.route

app.io.route('wind', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query('SELECT DISTINCT ON (tmstamp) tmstamp, vanmet, primet, h15met, ws7 from wind ORDER BY tmstamp ASC', function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VANMET = [];
                var PRIMET = [];
                var H15MET = [];
                var WS7 = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        VANMET.push(Math.round(result.rows[i].vanmet*100)/100);
                        PRIMET.push(Math.round(result.rows[i].primet*100)/100);
                        H15MET.push(Math.round(result.rows[i].h15met*100)/100);
                        WS7.push(Math.round(result.rows[i].ws7*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VANMET: VANMET,
                        PRIMET: PRIMET,
                        H15MET: H15MET,
                        WS7: WS7,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('swin', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query('SELECT DISTINCT ON (tmstamp) tmstamp, prisrin, prisrout, vansrin, vansrout from solar ORDER BY tmstamp ASC', function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var PRIMET_SW_IN = [];
                var PRIMET_SW_OUT= [];
                var VANMET_SW_IN = [];
                var VANMET_SW_OUT = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        PRIMET_SW_IN.push(Math.round(result.rows[i].prisrin*100)/100);
                        PRIMET_SW_OUT.push(Math.round(result.rows[i].prisrout*100)/100);
                        VANMET_SW_IN.push(Math.round(result.rows[i].vansrin*100)/100);
                        VANMET_SW_OUT.push(Math.round(result.rows[i].vansrout*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        PRIMET_SW_IN: PRIMET_SW_IN,
                        PRIMET_SW_OUT: PRIMET_SW_OUT,
                        VANMET_SW_IN: VANMET_SW_IN,
                        VANMET_SW_OUT: VANMET_SW_OUT,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout