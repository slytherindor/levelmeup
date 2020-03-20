'use strict'
let level = require('level');
let sub = require('level-sublevel');

module.exports = function (dbPath, callback) {
    let error;
    let db = sub(level(dbPath));

    db.on('error', function (err) {
        error = err
    });

    db.close(function (err) {
        callback(error || err);
    });

    let robots = db.sublevel('robots');
    let dinosaurs = db.sublevel('dinosaurs');

    robots.put('slogan', 'beep boop');
    dinosaurs.put('slogan', 'rawr');

}