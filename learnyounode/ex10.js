var net = require('net')
var server = net.createServer(function (socket) {
	var date = new Date()
	var year = date.getFullYear()
	var month = date.getMonth()
	if (month < 10) 
		month = "0" + (month+1)
	var day = date.getDate()
	if (day < 10)
		day = "0" + day
	var hours = date.getHours()
	if (hours < 10)
		hours = "0" + hours
	var minutes = date.getMinutes()
	if (minutes < 10) 
		minutes = "0" + minutes
		
	var dateStr = year + "-" + month + "-" + day + " " + hours +
			 ":" + minutes + "\n"
	socket.end(dateStr)
	
})
server.listen(process.argv[2])
