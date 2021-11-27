'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const expect      = require('chai').expect;
const cors        = require('cors');
require('dotenv').config();

const apiRoutes         = require('./routes/api.js');
const fccTestingRoutes  = require('./routes/fcctesting.js');
const runner            = require('./test-runner');
const ConvertHandler = require('./controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

let app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);
app.get('/api/convert:input?',(req,res) =>{
  //console.log(req.query);
  let input = req.query.input;
  let num,unit,converted,convertedUnit,str;
  num = convertHandler.getNum(input);
  unit = convertHandler.getUnit(input);
  //console.log(num);
  if(num === "invalid number"){
    if(unit === "invalid unit"){
      res.send('invalid number and unit');
    }
    res.send('invalid number');
  }
  else if(unit === "invalid unit"){
    res.send('invalid unit');
  }
  else{
  converted = convertHandler.convert(num,unit);
  convertedUnit = convertHandler.getReturnUnit(unit);
  str = convertHandler.getString(num,unit,converted,convertedUnit);
  console.log(converted.toFixed(5));
  res.json({
    initNum: num,
    initUnit: unit,
    returnNum: parseFloat(converted.toFixed(5)),
    returnUnit: convertedUnit,
    string: str
  });
}
});    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if(process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch(e) {
        let error = e;
          console.log('Tests are not valid:');
          console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
