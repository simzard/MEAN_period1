// Write a program that performs an HTTP GET request to a URL
// provided to you as the first command-line argument. 
// Collect all data from the server (not just the first "data"
// event) and then write two lines to the console (stdout).  
   
//  The first line you write should just be an integer
//  representing the number of characters received from the server.
//  The second line should contain the complete String of characters
//  sent by the server.  
var http = require('http')
var url = process.argv[2]

var numChars = 0;
var finalString = ""

http.get(url, function(response) {
	response.setEncoding('utf8')
	response.on("data", function (data) {
		finalString += data;
 		numChars += data.length;
 	})
 	response.on("end", function (data) {
 		console.log(numChars)
 		console.log(finalString)
 	})
})
