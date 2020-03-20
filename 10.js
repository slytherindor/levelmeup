'use strict'
let level = require('level');
module.exports.init = function(db, words, callback) {
    let batch = db.batch();
    for (let word of words) {
        
        let key = `${word.length}!${word}`;        
        batch.put(key, word);
        
    }
    batch.write(callback);
}
module.exports.query = function(db, word, callback) {
    let words = []
    let error;
    let regex = /\*/g;
    let key = `${word.length}!${word.replace(regex, '')}`
    db.createReadStream({start: key, end: key + '\xff'})
    .on('data', function (data) {
        words.push(data.value)
      })
      .on('error', function (err) {
        error = err
      })
      .on('end', function () {
        callback(error, words)
      })
}