'use strict'
let level = require('level')
module.exports = function (dbDir, callback) {
    let result = [];
    let keys = [...Array(100 + 1).keys()];
    let db = level(dbDir);
    let keyNotFoundErr;
    for (let keyIndex in keys) {
        db.get(`key` + keyIndex, function(err, value) {
            if(err && err.type !== 'NotFoundError') {
                keyNotFoundErr = err;
            } 
            if (value) {
                result.push(value);                               
            }

            if(keyIndex === '100') {
                db.close(function(error) {
                    callback(keyNotFoundErr || error, result);
                });                
            }
        })
    }

}