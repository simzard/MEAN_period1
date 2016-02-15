// This problem is the same as the previous problem (HTTP COLLECT)
// in that you need to use http.get(). However, this time you will
// be provided with three URLs as the first three command-line
// arguments.  
   
// You must collect the complete content provided to you by each
// of the URLs and print it to the console (stdout). You don't need
// to print out the length, just the data as a String; one line per
// URL. The catch is that you must print them out in the same order
// as the URLs are provided to you as command-line arguments. 
var http = require('http')
var url1 = process.argv[2]
var url2 = process.argv[3]
var url3 = process.argv[4]

var result1 = ""
var result2 = ""
var result3 = ""

var result1Done = false
var result2Done = false
var result3Done = false


get1(get2) 


function get1(callback) {
	http.get(url1, function(response) {
		response.setEncoding('utf8')
		response.on("data",function (data) {
			result1 += data
		})
		response.on("end",function (data) {
			callback();
		})	
	})
}

function get2() {
	http.get(url2, function(response) {
		response.setEncoding('utf8')
		response.on("data",function (data) {
		result2 += data
		})
		response.on("end",function (data) {
			get3();
		})	
	})
}

function get3() {
	http.get(url3, function(response) {
			response.setEncoding('utf8')
			response.on("data",function (data) {
			result3 += data
		})
			response.on("end",function (data) {
				console.log(result1)
				console.log(result2)
				console.log(result3)
		
			})	
	})
}

