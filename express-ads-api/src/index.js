// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
let partners = require('./partners.json');
var partnerController = require('./partnerController.js');

// ADD COMMENT TO 

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];


// adding Helmet to enhance your API's security
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }))

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
//TODO: add input parameters


var meetingCoordinates = {lat:51.5144636,lng:-0.142571};
var range = 1000;

// Operarion to getInRangePartnersDetails
app.get('/getInRangePartnersDetails', (req, res) => {
	
	var inRangePartners = [];
	
	inRangePartners.push(partnerController.getInRangePartnersDetails(partners, meetingCoordinates, range));	
	
	
	res.send(inRangePartners);
});


// starting the server
app.listen(5000, () => {
  console.log('listening on port 5000');
});