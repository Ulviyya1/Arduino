var http = require("http");
var firmata = require("firmata");

var board = new firmata.Board("/dev/ttyACM0", function()
{//ACM (Abstract Control Model) for ser.comm. with Ard. (could be USB)
board.pinMode(13, board.MODES.OUTPUT);
board.pinMode(12, board.MODES.OUTPUT);
});

http.createServer(function(req, res)
{//http.createServer([requestListener])
var parts = req.url.split("/"); //split request url on "/" character

var operator1 = parseInt(parts[1], 10 || 0);
var operator2 = parseInt(parts[2], 10);

console.log(operator1);
console.log(operator2);


if (operator1 == 0 && operator2 == 0)
{
board.digitalWrite(13, board.LOW);
board.digitalWrite(12, board.LOW);
}
else if (operator1 == 0 && operator2 == 1)
{
board.digitalWrite(13, board.LOW);
board.digitalWrite(12, board.HIGH);
}
else if (operator1 == 1 && operator2 == 1)
{
board.digitalWrite(13, board.HIGH);
board.digitalWrite(12, board.HIGH);
}
else if (operator1 == 1 && operator2 == 0)
{
board.digitalWrite(13, board.HIGH);
board.digitalWrite(12, board.LOW);
}
res.writeHead(200, {"Content-Type": "text/plain"});
res.write("For test write into browser address line: http://192.168.1.255:8080/1/ \n");
res.end("The value of operator: " + operator1 + " " + operator2);
console.log("**********************");
console.log(operator1);
console.log(operator2);

}).listen(8080, "192.168.1.100");

