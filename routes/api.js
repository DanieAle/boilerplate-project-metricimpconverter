'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
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
    console.log(convertedUnit);
    str = convertHandler.getString(num,unit,converted,convertedUnit);
    console.log(str);
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
};
