'use strict'
let level = require('level')

module.exports = function (dbDir, key, callback) {
    let db = level(dbDir);
    db.get(key, function(err, value) {
        db.close(function (error) {
            callback(err || error, value);
        });
        
    });

}