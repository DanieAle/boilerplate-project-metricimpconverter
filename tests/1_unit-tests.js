const { Assertion } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('convertHandler should correctly read a decimal number input.',function(){
        assert.isNumber(convertHandler.getNum("5.5mi"));
        assert.isNumber(convertHandler.getNum("0.5lbs"));
        assert.isNumber(convertHandler.getNum("0.15L"));
        assert.isNumber(convertHandler.getNum("10.5km"));
        assert.isNumber(convertHandler.getNum("100.598km"));
    });
    test('convertHandler should correctly read a fractional input.',function(){
        assert.isNumber(convertHandler.getNum("55/10lbs"));
        assert.isNumber(convertHandler.getNum("25/10lbs"));
        assert.isNumber(convertHandler.getNum("35/110lbs"));
        assert.isNumber(convertHandler.getNum("569/10lbs"));
    });
    test('convertHandler should correctly read a fractional input with a decimal.',function(){
        assert.isNumber(convertHandler.getNum("0.55/10.5lbs"));
        assert.isNumber(convertHandler.getNum("559.1/10.555lbs"));
        assert.isNumber(convertHandler.getNum("7564/10.5lbs"));
        assert.isNumber(convertHandler.getNum("1.5/10.5lbs"));
        assert.isNumber(convertHandler.getNum("5.198/10.5lbs"));
    });
    test('convertHandler should correctly return an error on a double-fraction',function(){
        assert.strictEqual(convertHandler.getNum("2/2/2kg"),"invalid number","sould be 'invalid number':"+convertHandler.getNum("2/2/2kg"));
        assert.strictEqual(convertHandler.getNum("2//2mi"),"invalid number","sould be 'invalid number':"+convertHandler.getNum("2//2mi"));
        assert.strictEqual(convertHandler.getNum("2/5/2lbs"),"invalid number","sould be 'invalid number':"+convertHandler.getNum("2/5/2lbs"));
        assert.strictEqual(convertHandler.getNum("//222L"),"invalid number","sould be 'invalid number':"+convertHandler.getNum("//222L"));
    });
    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.',function(){
        assert.strictEqual(convertHandler.getNum("mi"),1,"Sould be 1");
        assert.strictEqual(convertHandler.getNum("L"),1,"Sould be 1");
        assert.strictEqual(convertHandler.getNum("lbs"),1,"Sould be 1");
    });
    test('convertHandler should correctly return an error for an invalid input unit.',function(){
        assert.strictEqual(convertHandler.getUnit('t'),'invalid unit');
        assert.strictEqual(convertHandler.getUnit('25kmr'),'invalid unit');
        assert.strictEqual(convertHandler.getUnit('15t'),'invalid unit');
    });
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.',function(){
        assert.strictEqual(convertHandler.getUnit('5.5gal'),'gal');
        assert.strictEqual(convertHandler.getUnit('5.5lbs'),'lbs');
        assert.strictEqual(convertHandler.getUnit('5.5mi'),'mi');
        assert.strictEqual(convertHandler.getUnit('5.5L'),'L');
        assert.strictEqual(convertHandler.getUnit('5.5km'),'km',);
    });
    test('convertHandler should correctly convert gal to L.',function(){
        assert.strictEqual('L',convertHandler.getReturnUnit('gal'));
    });
    test('convertHandler should correctly convert L to gal.',function(){
        assert.strictEqual('gal',convertHandler.getReturnUnit('L'));
    });
    test('convertHandler should correctly convert mi to km.',function(){
        assert.strictEqual('mi',convertHandler.getReturnUnit('km'));
    });
    test('convertHandler should correctly convert km to mi.',function(){
        assert.strictEqual('km',convertHandler.getReturnUnit('mi'));
    });
    test('convertHandler should correctly convert lbs to kg.',function(){
        assert.strictEqual('lbs',convertHandler.getReturnUnit('kg'));
    });
    test('convertHandler should correctly convert kg to lbs.',function(){
        assert.strictEqual('kg',convertHandler.getReturnUnit('lbs'));
    });
});