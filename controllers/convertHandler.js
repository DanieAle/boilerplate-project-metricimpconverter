function ConvertHandler() {
  const obj = {
    mi: "miles",
    km: "kilometers",
    gal: "gallons",
    lbs: "pounds",
    L: "liters",
    kg: "kilograms"
  }
  this.getNum = function(input) {
    let value;
    let count;
    if(/\/+\d+?\/+|\/+\d+.?\d+?\/+|\/{2,}/g.test(input)=== true){
      return "invalid number";
    }
    if(/\d/.test(input) === false){
      return 1;
    }
    let operation = input.split(/[a-z]/i)[0];
    let index = operation.indexOf("/");
    if(index !== -1){
      let nums = operation.split("/");
      value = parseFloat(nums[0]) / parseFloat(nums[1]);
    }
    else{
      value = parseFloat(operation);
    }
    return value;
  };
  
  this.getUnit = function(input) {
    let u = input.match(/[a-z]+/i)[0];
    let result = "invalid unit";
    for(let unit in obj){
      if(u.toLocaleLowerCase() === unit.toString().toLocaleLowerCase() && result === "invalid unit"){
        if(u === 'l' || u === 'L'){
          result = 'L';
        }
        else{
        result = u.toLocaleLowerCase();
        }
      }
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLocaleLowerCase()){
      case 'mi':
        result = 'km';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'l':
        result = 'gal';
        break;
      case 'kg':
        result = 'lbs';
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit.toLocaleLowerCase()){
      case 'mi':
        result = "miles";
        break;
      case 'gal':
        result = "gallons";
        break;
      case 'lbs':
        result = "pounds";
        break;
      case 'km':
        result = "kilometers";
        break;
      case 'l':
        result = "liters"
        break;
      case 'kg':
        result = "kilograms";
        break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit.toLocaleLowerCase()){
      case 'km':
        result = initNum/miToKm;
        break;
      case 'gal':
        result = initNum*galToL;
        break;
      case 'kg':
        result = initNum/lbsToKg;
        break;
      case 'mi':
        result = initNum*miToKm;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum*lbsToKg;
        break;
    }

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit.toLocaleLowerCase())} converts to ${returnNum.toFixed(5)} ${this.spellOutUnit(returnUnit.toLocaleLowerCase())}`
    };
  
}

module.exports = ConvertHandler;
