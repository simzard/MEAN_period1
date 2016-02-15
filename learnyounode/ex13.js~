// Write an HTTP server that serves JSON data when it
// receives a GET request to the path '/api/parsetime'.
// Expect the request to contain a query string
// with a key 'iso' and an ISO-format time as the value.  
var http = require('http')
var url = require('url')


var port = process.argv[2]
var server = http.createServer(function (request, response) {  
	// request handling logic...  
	var pathname = url.parse(request.url, true).pathname
	//console.log(pathname)
	//console.log(request.url)
	if (request.method == 'GET' && pathname == '/api/parsetime') {
		console.log('in handler')
		var isotime = new Date(url.parse(request.url, true).query.iso)
		var timeObj = {
			hour: isotime.getHours(),
			minute: isotime.getMinutes(),
			second: isotime.getSeconds()
		}
		response.writeHead(200, { 'Content-Type': 'application/json' }) 
		response.write(JSON.stringify(timeObj));
		response.end();						
	} else if (request.method == 'GET' && pathname == '/api/unixtime') {
		var timeObj = { 
			unixtime: (Date.now()-100576)
		}
		response.writeHead(200, { 'Content-Type': 'application/json' }) 
		response.write(JSON.stringify(timeObj));
		response.end();						
	}
})  
server.listen(port)  

