const net = require('net');


var option = {
    host: 'XXX.XXX.XXX.XXX',
    port: 1234
}

// This function create and return a net.Socket object to represent TCP client.
function createClient(command) {

    // Create TCP client.
    var client = net.createConnection(option, function () {
        console.log('Start Connection');
        console.log('Connection local address : ' + client.localAddress + ":" + client.localPort);
        console.log('Connection remote address : ' + client.remoteAddress + ":" + client.remotePort);
    });

    client.setEncoding('ASCII');

    // When receive server send back data.
    client.on('data', function (data) {
        console.log('Returned data : ' + data);
    });

    client.on('end', function () {
        console.log('Client socket disconnect. ');
    });

    client.on('error', function (err) {
        console.error(err);
    });

    return client;
}
// replace string to CoLa-A 
function getASCIICmd(str){
    var str = 0 + str + 0;
    var buffer = new Buffer(str, 'ASCII');

    buffer[0] = 2; // ASCII Char 2 STX
    buffer[buffer.length - 1] = 3; // ACII Char 3 ETX

    return str;
}
//Example Commands for the SICK RFU6xx RFID Reader
//device identification 'sRN DeviceIdent'
//start scan            'sMN MIStartIn'
//stop scan             'sMN MIStopIn0'
//set transmit power    'sRA ADconfig <enabled> <dwelltime> <txpower> <txpowerWrite> <invrounds> <priority> <txpowerAPCmin> <txpowerAPCinc> <reserved></reserved>'

// Create a client socket and send command.
var client = createClient();
client.write(getASCIICmd("sRN DeviceIdent"));


