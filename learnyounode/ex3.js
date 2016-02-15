// Program that reads a file and print the number of newlines it contains to 
// the console

// load the fs module from the Node core library
var fs = require('fs')

// synchronous file read call
var buffer = fs.readFileSync(process.argv[2])

var lines = buffer.toString().split('\n')

// last line will not have a newline thus -1
console.log(lines.length - 1)


