var http = require("http").createServer(handler); // ob zahtevi req -> handler
var firmata = require("firmata");
var fs = require("fs");
var io = require("socket.io").listen(http);

console.log("Connecting to Arduino");

var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Activation of pin 2");
    board.pinMode(2, board.MODES.OUTPUT);
    console.log("Activation of pin 3");
    board.pinMode(3, board.MODES.PWM);
});

function handler(req, res) {
    fs.readFile(__dirname + "/example12.html",
    function(err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani!");
        }
        res.writeHead(200);
        res.end(data);
    });
}

http.listen(8080); // strežnik bo poslušal na vratih 8080

var želenaVrednost = 0; // želeno vrednost postavimo na 0

console.log("Zagon sistema"); // izpis sporočila o zagonu

board.on("ready", function(){
    console.log("Plošča pripravljena");
    board.analogRead(0, function(value){
        želenaVrednost = value; // neprekinjeno branje pina A0
    });
io.sockets.on("connection", function(socket){
        
        socket.on("pošljiPWM", function(pwm){
            board.analogWrite(3,pwm); // zapišem hitrost pwm na pin 3
            console.log("PWM poslan." + pwm);
        });
socket.on("levo", function(Value) {
            board.digitalWrite(2,Value);
        });
        
        socket.on("desno", function(Value) {
            board.digitalWrite(2,Value);
        });
        
        socket.on("stop", function(Value) {
            board.analogWrite(3,Value);
        });
        
    });
    
});
    