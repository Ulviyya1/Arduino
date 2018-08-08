var http = require("http").createServer(handler); // handler
var firmata = require("firmata");
var fs = require("fs");
var io = require("socket.io").listen(http);

console.log("Connecting to Arduino");

var board = new firmata.Board("/dev/ttyACM0", function(){
    console.log("Activation of pin 2");
    board.pinMode(2, board.MODES.OUTPUT);
    console.log("Activation of pin 3");
    board.pinMode(3, board.MODES.PWM);
    board.pinMode(0, board.MODES.ANALOG); // analog pin 0
});

function handler(req, res) {
    fs.readFile(__dirname + "/assignment02.html",
    function(err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani!");
        }
        res.writeHead(200);
        res.end(data);
    });
}
var desiredValue = 0;
http.listen(8080); // strežnik bo poslušal na vratih 8080
board.on("ready", function() {
    
    board.analogRead(0, function(value){
        desiredValue = value; // continuous read of analog pin 0
    });

    io.sockets.on("connection", function(socket){
        
        socket.on("sendPWM", function(pwm){
                var pwm2 = pwm - 512;
                if (pwm2  < 0 )
                {
                board.digitalWrite(2, 1);
                pwm2 = Math.abs(pwm-512)/512 * 255;
                }
            else {
                board.digitalWrite(2, 0);
                pwm2 = Math.round(Math.abs(pwm-512)/512 *255);
            }
            
            board.analogWrite(3,pwm2); // zapišem hitrost pwm na pin 3
            console.log("PWM poslan." + pwm2);
         

        });
        socket.on("left", function(Value) {
            board.digitalWrite(2,Value);
        });
        
        socket.on("right", function(Value) {
            board.digitalWrite(2,Value);
        });
        
        socket.on("stop", function(Value) {
            board.analogWrite(3,Value);
        });
        
        socket.on("disconnect", function() {
        board.analogWrite(3,0);
        })
        
       
        
        socket.emit("messageToClient", "Server connected, board ready.");
        setInterval(sendValues, 40, socket); // na 40ms we send message to client
    }); // end of sockets.on connection
}); // // end of board.on ready
        
function sendValues (socket) {
 socket.emit("clientReadValues",
 {
 "desiredValue": desiredValue
 });
 }
 

    
 


    

    

    