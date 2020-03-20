'use strict'
let level = require('level');
let stream = require('stream');
module.exports = function(dbDir) {
    let db = level(dbDir);
    db.createReadStream().on('close', function() {
        db.close();
    });
    db.on('error', function(err) {
        console.log(err);
    });
    // To send data as string/object when returning whole stream
    // use readableObjectMode = true, else data will be received as
    // buffer on the other side.
    let dataStream = new stream.Transform({transform(chunk, enc, callback) {
        this.push(`${chunk.key}=${chunk.value}`);
        callback();
    }, writableObjectMode: true, readableObjectMode:true});
    dataStream.on('close', function (){
        db.close(function(err){
            
        });
    });
    return db.createReadStream().pipe(dataStream);
}