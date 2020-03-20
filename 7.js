'use strict'
let level = require('level');
module.exports = function(dbDir, dateString, callback) {
    let error;
    let db = level(dbDir);
    let tweetsCount = 0;
    let dateToISO = new Date(dateString).toISOString();
    // console.log(dateToISO);
    db.on('error', function(err) {
        error = err;
    });
    db.createReadStream({gte: dateToISO}).on('data', function() {
        tweetsCount++;
    }).on('end', function(){
        db.close();
        callback(error, tweetsCount);
    });
    


}