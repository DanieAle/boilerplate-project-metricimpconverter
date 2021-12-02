const { Assertion } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const {suite, test} = require('mocha');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    [   
        {unit:'L',num:15,expectedUnit:'gal',expectedNum:15,spellUnit:"liters"},
        {unit:'L',num:'60/2',expectedUnit:'gal',expectedNum:30,spellUnit:"liters"},
        {unit:'mi',num:10,expectedUnit:'km',expectedNum:10,spellUnit:"miles"},
        {unit:'gal',num:'35/7',expectedUnit:'L',expectedNum:5,spellUnit:"gallons"},
        {unit:'kg',num:20.10,expectedUnit:'lbs',expectedNum:20.10,spellUnit:"kilograms"},
        {unit:'kg',num:'40/4.5',expectedUnit:'lbs',expectedNum:8.88888888888889,spellUnit:"kilograms"},
        {unit:'lbs',num:7,expectedUnit:'kg',expectedNum:7,spellUnit:"pounds"},
        {unit:'lbs',num:'100/2',expectedUnit:'kg',expectedNum:50,spellUnit:"pounds"},
        {unit:'km',num:9.5,expectedUnit:'mi',expectedNum:9.5,spellUnit:"kilometers"},
        {unit:'mi',num:'200/20.5',expectedUnit:'km',expectedNum:9.75609756097561,spellUnit:"miles"},
        {unit:'gal',num:25,expectedUnit:'L',expectedNum:25,spellUnit:"gallons"},
        {unit:'km',num:'25.5/5',expectedUnit:'mi',expectedNum:5.1,spellUnit:"kilometers"},
        {unit:'L',num:'20/5',expectedUnit:'gal',expectedNum:4,spellUnit:"liters"},
        {unit:'gal',num:'500/10',expectedUnit:'L',expectedNum:50,spellUnit:"gallons"},
        {unit:'kg',num:'',expectedUnit:'lbs',expectedNum:1,spellUnit:"kilograms"},
        {unit:'mi',num:'',expectedUnit:'km',expectedNum:1,spellUnit:"miles"}
    ].forEach((item) =>{
        test(`convert ${item.num+item.unit} in valid results`,(done) =>{
            let input = item.num+item.unit;
            assert.isNumber(convertHandler.getNum(input));
            assert.strictEqual(convertHandler.getNum(input),item.expectedNum);
            assert.strictEqual(convertHandler.getUnit(input),item.unit);
            assert.strictEqual(convertHandler.getReturnUnit(item.unit),item.expectedUnit);
            assert.strictEqual(convertHandler.spellOutUnit(item.unit),item.spellUnit);
            done();
        });
    });
    [
        {unit:'t',num:'//5.5'},
        {unit:'r',num:'3//5'},
        {unit:'mil',num:'15/5/3'},
        {unit:'kilograms',num:'100/5/3'}
    ].forEach((item) => {
        test('invalid results:'+item.num+item.unit, (done) =>{
            let input = item.num+item.unit;
            assert.strictEqual(convertHandler.getUnit(input),"invalid unit");
            assert.strictEqual(convertHandler.getNum(input),"invalid number")
            done();
        });
    });
});