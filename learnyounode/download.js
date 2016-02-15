var request = require("request");
var fs = require("fs");
// HTTP GET Request
request("http://www.libpng.org/pub/png/libpng-manual.txt")

   .pipe(fs.createWriteStream("MANUAL.txt"));
