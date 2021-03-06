// Write an HTTP server that serves the same text file for
// each request it receives.  

// Your server should listen on the port provided by the first
// argument to your program.  
   
// You will be provided with the location of the file to serve
// as the second command-line argument. You must use the
// fs.createReadStream() method to stream the file contents
// to the response.  

var fs = require('fs')

var file = process.argv[3]

var http = require('http')  
var server = http.createServer(function (req, res) {  
	// request handling logic...  
	var filestream = fs.createReadStream(file) 
	filestream.pipe(res)
})  
server.listen(process.argv[2])  

