'use strict'
let level = require('level');
module.exports = function(dbDir, changes, callback) {
    let db = level(dbDir);
    db.on('ready', function(err) {
        let batch = db.batch();
        for (let delObj of changes.del) {
            batch.del(delObj);
        }
        let putObj = changes.put;
        for (let property in putObj) {
            batch.put(property, putObj[property]);
        }
        batch.write(callback);
    })
}