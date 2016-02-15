// Write a program that uses a single asynchronous
// filesystem operation to read a file and print the
// number of newlines it contains to the console  
var fs = require('fs')

fs.readFile(process.argv[2],'utf-8', function(err, data) {
	if (!err) {
		var lines = data.toString().split('\n').length - 1;
		console.log(lines);	
	}
})

