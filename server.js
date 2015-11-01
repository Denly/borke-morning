// Require the twilio and express modules
var twilio = require('twilio'),
    express = require('express');
 
// Create an express application
var app = express();
app.use(express.static(__dirname + '/public'));
// Render an HTML page which contains a capability token that
// will grant permission to accept inbound calls to the ID
// "kevin" (this could be any string)
app.get('/', function(req, res) {
 
    // Create an object which will generate a capability token
    // Replace these two arguments with your own account SID
    // and auth token:
    var ACCOUNT_SID = 'AC37ca66804bf89e3ba7d5dca997a0263c';
    var AUTH_TOKEN = '5eddac1b23f1ad352d3c37425c767f76';
    var capability = new twilio.Capability(
        ACCOUNT_SID,AUTH_TOKEN
        //process.env.TWILIO_ACCOUNT_SID,
        //process.env.TWILIO_AUTH_TOKEN
    );
 
    // Give the capability generator permission to accept incoming
    // calls to the ID "kevin"
    capability.allowClientIncoming('kevin');

    // Give the capability generator permission to make outbound calls,
    // Using the following TwiML app to request call handling instructions:
    capability.allowClientOutgoing('AP3bec6076207056654ef1bbfa114fcaa3');
    //capability.allowClientOutgoing('AP627b8bc632512cb9ec5454b42d4b330f');
 
    // Render an HTML page which contains our capability token
    res.render('index.ejs', {
        token:capability.generate()
    });
});
 
app.listen(1337);
console.log('Visit http://localhost:1337/ to accept inbound calls and make outbound calls!');