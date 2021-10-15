const { Assertion } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('Check:Intenger,Float and "/"',function(){
        assert.isNumber(convertHandler.getNum("5mi"));
        assert.isNumber(convertHandler.getNum("5.5l"));
        assert.isNumber(convertHandler.getNum("5/10lbs"),"sould be 'number':"+convertHandler.getNum("5/10lbs"));
        assert.strictEqual(convertHandler.getNum("2/2/2kg"),"invalid number","sould be 'invalid number':"+convertHandler.getNum("2/2/2kg"));
        assert.strictEqual(convertHandler.getNum("mi"),1,"Sould be 1")
    });
    test('isValidUnit',function(){
        assert.strictEqual(convertHandler.getUnit('5.5gal'),'gal');
        assert.strictEqual(convertHandler.getUnit('5.5lbs'),'lbs');
        assert.strictEqual(convertHandler.getUnit('5.5mi'),'mi');
        assert.strictEqual(convertHandler.getUnit('5.5L'),'L');
        assert.strictEqual(convertHandler.getUnit('5.5km'),'km',);
        assert.strictEqual(convertHandler.getUnit('t'),'invalid unit');
    });
    test('isConverted',function(){
        assert.strictEqual('L',convertHandler.getReturnUnit('gal'));
        assert.strictEqual('gal',convertHandler.getReturnUnit('L'));
        assert.strictEqual('mi',convertHandler.getReturnUnit('km'));
        assert.strictEqual('km',convertHandler.getReturnUnit('mi'));
        assert.strictEqual('lbs',convertHandler.getReturnUnit('kg'));
        assert.strictEqual('kg',convertHandler.getReturnUnit('lbs'));
    });
});