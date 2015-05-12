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

app.io.route('lwin', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query('SELECT DISTINCT ON (tmstamp) tmstamp, prlrin, prilrout, vanlrin, vanlrout from solar ORDER BY tmstamp ASC', function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var PRIMET_LW_IN = [];
                var PRIMET_LW_OUT= [];
                var VANMET_LW_IN = [];
                var VANMET_LW_OUT = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        PRIMET_LW_IN.push(Math.round(result.rows[i].prlrin*100)/100);
                        PRIMET_LW_OUT.push(Math.round(result.rows[i].prilrout*100)/100);
                        VANMET_LW_IN.push(Math.round(result.rows[i].vanlrin*100)/100);
                        VANMET_LW_OUT.push(Math.round(result.rows[i].vanlrout*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        PRIMET_LW_IN: PRIMET_LW_IN,
                        PRIMET_LW_OUT: PRIMET_LW_OUT,
                        VANMET_LW_IN: VANMET_LW_IN,
                        VANMET_LW_OUT: VANMET_LW_OUT,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('net', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query('SELECT DISTINCT ON (tmstamp) tmstamp, prlrin, prilrout, prisrin, prisrout, vanlrin, vanlrout, vansrin, vansrout from solar ORDER BY tmstamp ASC', function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var PRIMET_NET = [];
                var VANMET_NET= [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        PRIMET_NET.push(-1*Math.round(result.rows[i].prilrout*100)/100 - Math.round(result.rows[i].prisrout*100)/100 + Math.round(result.rows[i].prlrin*100)/100 +Math.round(result.rows[i].prisrin*100)/100);
                        VANMET_NET.push(-1*Math.round(result.rows[i].vanlrout*100)/100 - Math.round(result.rows[i].vansrout*100)/100 + Math.round(result.rows[i].vanlrin*100)/100 + Math.round(result.rows[i].vansrin*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        PRIMET_NET: PRIMET_NET,
                        VANMET_NET: VANMET_NET,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('seven', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query('SELECT DISTINCT ON (tmstamp) tmstamp, incoming, outgoing from sevenrad ORDER BY tmstamp ASC', function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var WS7_INCOMING = [];
                var WS7_OUTGOING= [];
                var WS7_NET = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        WS7_INCOMING.push(Math.round(result.rows[i].incoming*100)/100);
                        WS7_OUTGOING.push(Math.round(result.rows[i].outgoing*100)/100)
                        WS7_NET.push(Math.round(result.rows[i].incoming*100)/100 - Math.round(result.rows[i].outgoing*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        WS7_INCOMING: WS7_INCOMING,
                        WS7_OUTGOING: WS7_OUTGOING,
                        WS7_NET: WS7_NET,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('cross', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT ON (solar.tmstamp) solar.tmstamp, solar.prisrin, solar.prisrout, solar.prlrin, solar.prilrout, solar.vansrin, solar.vansrout, solar.vanlrin, solar.vanlrout, sevenrad.incoming, sevenrad.outgoing from solar, sevenrad where date_part('month', solar.tmstamp) = date_part('month', sevenrad.tmstamp) and date_part('day', solar.tmstamp) = date_part('day', sevenrad.tmstamp) and date_part('hour', solar.tmstamp) = date_part('hour', sevenrad.tmstamp) and date_part('minute', solar.tmstamp) = date_part('minute', sevenrad.tmstamp) ORDER BY solar.tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var PRIMET = [];
                var VANMET= [];
                var WS7 = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        PRIMET.push(-1*Math.round(result.rows[i].prilrout*100)/100 - Math.round(result.rows[i].prisrout*100)/100 + Math.round(result.rows[i].prlrin*100)/100 +Math.round(result.rows[i].prisrin*100)/100);
                        VANMET.push(-1*Math.round(result.rows[i].vanlrout*100)/100 - Math.round(result.rows[i].vansrout*100)/100 + Math.round(result.rows[i].vanlrin*100)/100 + Math.round(result.rows[i].vansrin*100)/100);
                        WS7.push(Math.round(result.rows[i].incoming*100)/100 - Math.round(result.rows[i].outgoing*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        PRIMET: PRIMET,
                        VANMET: VANMET,
                        WS7: WS7,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('rain', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT ON (tmstamp) tmstamp, uplmet, cenmet, h15met from rain ORDER BY tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var UPLMET = [];
                var CENMET= [];
                var H15MET = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        UPLMET.push(Math.round(result.rows[i].uplmet*100)/100);
                        CENMET.push(Math.round(result.rows[i].cenmet*100)/100);
                        H15MET.push(Math.round(result.rows[i].h15met*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        UPLMET: UPLMET,
                        CENMET: CENMET,
                        H15MET: H15MET,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('lys', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT on (tmstamp) tmstamp, cenmet, h15met from lys ORDER BY tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var CENMET= [];
                var H15MET = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        CENMET.push(Math.round(result.rows[i].cenmet*100)/100);
                        H15MET.push(Math.round(result.rows[i].h15met*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        CENMET: CENMET,
                        H15MET: H15MET,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('snc_means', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT ON (tmstamp) tmstamp, vanmetsnc, primetsnc, cenmetsnc from sncfun ORDER BY tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VANMET = [];
                var PRIMET= [];
                var CENMET = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        VANMET.push(Math.round(result.rows[i].vanmetsnc*100)/100);
                        PRIMET.push(Math.round(result.rows[i].primetsnc*100)/100);
                        CENMET.push(Math.round(result.rows[i].cenmetsnc*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VANMET: VANMET,
                        PRIMET: PRIMET,
                        CENMET: CENMET,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('dir', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT ON (tmstamp) tmstamp, vanmet, primet, ws7, h15met from dir ORDER BY tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VANMET = [];
                var PRIMET= [];
                var WS7 = [];
                var H15MET = [];
                for (var i = 0; i < result.rows.length; ++i) {

                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        if (result.rows[i].vanmet < 180){
                            VANMET.push(Math.round(result.rows[i].vanmet*100)/100);
                        } else {VANMET.push(360-Math.round(result.rows[i].vanmet*100)/100); 
                        };
                        if (result.rows[i].cenmet < 180){
                            PRIMET.push(Math.round(result.rows[i].cenmet*100)/100);
                        } else {
                           PRIMET.push(360-Math.round(result.rows[i].cenmet*100)/100); 
                        };
                        if (result.rows[i].ws7 < 180){
                            WS7.push(Math.round(result.rows[i].ws7*100)/100);  
                        } else {
                            WS7.push(360-Math.round(result.rows[i].ws7*100)/100);
                        };
                        if (result.rows[i].h15met < 180){
                            H15MET.push(Math.round(result.rows[i].h15met*100)/100);
                        } else {
                            H15MET.push(360-Math.round(result.rows[i].h15met*100)/100);
                        }
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VANMET: VANMET,
                        PRIMET: PRIMET,
                        WS7: WS7,
                        H15MET: H15MET,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('vanwindmax', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("select DISTINCT on (sncfun.tmstamp) sncfun.tmstamp, sncfun.vanmetsnc, sncfun.vanmetsncmax, windmax.vanpromax, windmax.sevenpromax from sncfun, windmax where sncfun.tmstamp = windmax.tmstamp ORDER BY sncfun.tmstamp asc", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VAN_SONIC = [];
                var VAN_SONIC_MAX= [];
                var VAN_PRO_MAX = [];
                var SEVEN_PRO_MAX = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        VAN_SONIC.push(Math.round(result.rows[i].vanmetsnc*100)/100);
                        VAN_SONIC_MAX.push(Math.round(result.rows[i].vanmetsncmax*100)/100);
                        VAN_PRO_MAX.push(Math.round(result.rows[i].vanpromax*100)/100);
                        SEVEN_PRO_MAX.push(Math.round(result.rows[i].sevenpromax*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VAN_SONIC: VAN_SONIC,
                        VAN_SONIC_MAX: VAN_SONIC_MAX,
                        VAN_PRO_MAX: VAN_PRO_MAX,
                        SEVEN_PRO_MAX: SEVEN_PRO_MAX,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('cenwindmax', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("select DISTINCT on (sncfun.tmstamp) sncfun.tmstamp, sncfun.cenmetsnc, sncfun.cenmetsncmax, windmax.cenpromax, windmax.sevenpromax from sncfun, windmax where sncfun.tmstamp = windmax.tmstamp ORDER BY sncfun.tmstamp asc", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var CEN_SONIC = [];
                var CEN_SONIC_MAX= [];
                var CEN_PRO_MAX = [];
                var SEVEN_PRO_MAX = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        CEN_SONIC.push(Math.round(result.rows[i].cenmetsnc*100)/100);
                        CEN_SONIC_MAX.push(Math.round(result.rows[i].cenmetsncmax*100)/100);
                        CEN_PRO_MAX.push(Math.round(result.rows[i].cenpromax*100)/100);
                        SEVEN_PRO_MAX.push(Math.round(result.rows[i].sevenpromax*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        CEN_SONIC: CEN_SONIC,
                        CEN_SONIC_MAX: CEN_SONIC_MAX,
                        CEN_PRO_MAX: CEN_PRO_MAX,
                        SEVEN_PRO_MAX: SEVEN_PRO_MAX,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('airasp', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT ON (tmstamp) tmstamp, vanmetair, vanmetasp, primetair, primetasp, cenmetair, cenmetasp from airasp ORDER BY tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VAN_GILL = [];
                var VAN_ASP= [];
                var PRI_GILL = [];
                var PRI_ASP = [];
                var CEN_GILL = [];
                var CEN_ASP = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        VAN_GILL.push(Math.round(result.rows[i].vanmetair*100)/100);
                        VAN_ASP.push(Math.round(result.rows[i].vanmetasp*100)/100);
                        PRI_GILL.push(Math.round(result.rows[i].primetair*100)/100);
                        PRI_ASP.push(Math.round(result.rows[i].primetasp*100)/100);
                        CEN_GILL.push(Math.round(result.rows[i].cenmetair*100)/100);
                        CEN_ASP.push(Math.round(result.rows[i].cenmetasp*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VAN_GILL: VAN_GILL,
                        VAN_ASP: VAN_ASP,
                        PRI_GILL: PRI_GILL,
                        PRI_ASP: PRI_ASP,
                        CEN_GILL: CEN_GILL,
                        CEN_ASP: CEN_ASP,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('maxair', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("SELECT DISTINCT ON (tmstamp) tmstamp, vanmet350,  vanmet350asp, primet350, primet350asp, cenmet350, cenmet350asp from maxair ORDER BY tmstamp ASC", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var VAN_GILL = [];
                var VAN_ASP= [];
                var PRI_GILL = [];
                var PRI_ASP = [];
                var CEN_GILL = [];
                var CEN_ASP = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        VAN_GILL.push(Math.round(result.rows[i].vanmet350*100)/100);
                        VAN_ASP.push(Math.round(result.rows[i].vanmet350asp*100)/100);
                        PRI_GILL.push(Math.round(result.rows[i].primet350*100)/100);
                        PRI_ASP.push(Math.round(result.rows[i].primet350asp*100)/100);
                        CEN_GILL.push(Math.round(result.rows[i].cenmet350*100)/100);
                        CEN_ASP.push(Math.round(result.rows[i].cenmet350asp*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        VAN_GILL: VAN_GILL,
                        VAN_ASP: VAN_ASP,
                        PRI_GILL: PRI_GILL,
                        PRI_ASP: PRI_ASP,
                        CEN_GILL: CEN_GILL,
                        CEN_ASP: CEN_ASP,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout

app.io.route('vanair', function (req) {

    pg.connect('postgres://ws7:ws7@localhost/seven', function(err, client,done) {
        if (err) {
            return console.error('error fetching client from pool', err);
            }
            client.query("select DISTINCT on (maxair.tmstamp) maxair.tmstamp, maxair.vanmet350, maxair.vanmet350asp,  sncfun.vanmetsnc, sncfun.vanmetsncmax  from maxair, sncfun where maxair.tmstamp = sncfun.tmstamp ORDER BY maxair.tmstamp asc", function(err, result) {
                done();
                if (err) {
                    return console.error('error blerg', err);
                }
                console.log(result.rows.length);
                var TmStamp = [];
                var GILL_MAX = [];
                var ASP_MAX = [];
                var SONIC_MEAN = [];
                var SONIC_MAX = [];
                for (var i = 0; i < result.rows.length; ++i) {
                        TmStamp.push(result.rows[i].tmstamp.getTime());
                        GILL_MAX.push(Math.round(result.rows[i].vanmet350*100)/100);
                        ASP_MAX.push(Math.round(result.rows[i].vanmet350asp*100)/100);
                        SONIC_MEAN.push(Math.round(result.rows[i].vanmetsnc*100)/100);
                        SONIC_MAX.push(Math.round(result.rows[i].vanmetsncmax*100)/100);
                }
                req.io.emit('plot-data', {
                        TmStamp: TmStamp,
                        GILL_MAX: GILL_MAX,
                        ASP_MAX: ASP_MAX,
                        SONIC_MEAN: SONIC_MEAN,
                        SONIC_MAX: SONIC_MAX,
                });
//               }
            }); // for the client.query
//        }
    }); // for the pg.connect
}); // for the app.io.rout