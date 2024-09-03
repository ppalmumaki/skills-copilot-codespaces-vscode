// Create web server
// 1. Create a web server
// 2. Read the file
// 3. Parse the file
// 4. Send the file

// 1. Create a web server
var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function (request, response) {
    var url_parts = url.parse(request.url, true);
    var path = url_parts.pathname;
    var query = url_parts.query;

    if (path === '/comments') {
        if (request.method === 'POST') {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                console.log('POSTed: ' + body);
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end('{"status": "ok"}');
            });
        } else {
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end('{"status": "ok"}');
        }
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.end('Not found\n');
    }
}).listen(8124);

console.log('Server running at http://');