'use strict'
let level = require('level')
module.exports = function (dbDir, obj, callback) {
    let db = level(dbDir);
    let keys = Object.keys(obj);
    let error;

    for (let key of keys) {
        db.put(key, obj[key]);
    }
    
    db.on('error', function(err) {
        error = err
    });

    db.close(function(err) {
        callback(error || err);
    });
}