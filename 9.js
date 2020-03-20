'use strict'
let level = require('level');
let fs = require('fs');

module.exports = function(dbDir, pathToJSON, callback) {
    let db = level(dbDir, { valueEncoding: 'json'});
    let batch = db.batch();
    fs.createReadStream(pathToJSON).on('data', function(data){
        let regex = /\[|\]|\n/g;
        let splitRegex = /},/g;
        let jsonArray = data.toString().replace(regex, "").replace(splitRegex, "}\n").split("\n");
        for (let datum of jsonArray) {
            let obj = JSON.parse(datum);            
            let key = "";
            if (obj.type === 'user') {
                key = obj.name
            } else {
                key = obj.user + "!" + obj.name
            }
            batch.put(key, obj);
        }
        batch.write(callback)
    });

}