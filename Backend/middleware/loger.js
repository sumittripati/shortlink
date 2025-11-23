let fs = require('fs');
let path = require('path');

let FileName = 'requests.log';
let logFilePath = path.join(__dirname, '..', FileName);

let logger = (req, res, next) => {
    let log = `${new Date().toISOString()} - ${req.method} ${req.originalUrl}\n`;
    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
};

module.exports = logger;