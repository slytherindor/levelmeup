'use strict'
let level = require('level');
module.exports = function(dbDir, dateString, callback) {
    let error;
    let db = level(dbDir);
    let tweets = [];
    db.on('error', function(err) {
        error = err;
    });
    db.createReadStream({gte: dateString, lte: `${dateString}\xff`}).on('data', function(data) {
        tweets.push(data.value);
    }).on('end', function(){
        db.close();
        callback(error, tweets);
    });
    


}