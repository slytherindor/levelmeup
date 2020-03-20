'use strict'
let multilevel = require('multilevel');
let net = require('net')

module.exports = function(callback) {
    let db = multilevel.client();
    let connection = net.connect(4545);
    connection.pipe(db.createRpcStream()).pipe(connection)
    db.get('multilevelmeup', function(err, data) {
        connection.end(function(){
            callback(err, data);
        });
        

    });

}