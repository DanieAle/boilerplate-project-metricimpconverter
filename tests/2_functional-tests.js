const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Get:'+"/api/convert/?input=10L",function(){
        chai
        .request(server)
        .get("/api/convert/?input=10L")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            //console.log(res.body);
            assert.hasAllKeys(res.body,['initNum','initUnit','returnNum','returnUnit','string'],"Object need initNum,initUnit,returnNum,returnUnit,string property");
        });
    });
    test('Get:'+"/api/convert/?input=32g",function(){
        chai
        .request(server)
        .get("/api/convert/?input=32g")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.equal(res.text,"invalid unit");
        });
    });
    test('Get:'+"/api/convert/?input=3/7.2/4kg",function(){
        chai
        .request(server)
        .get("/api/convert/?input=3/7.2/4kg")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.equal(res.text,"invalid number");
        });
    });
    test('Get:'+"/api/convert/?input=3/7.2/4kilomegagram",function(){
        chai
        .request(server)
        .get("/api/convert/?input=3/7.2/4kilomegagram")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.equal(res.text,"invalid number and unit");
        });
    });
    test('Get:'+"/api/convert/?input=kg",function(){
        chai
        .request(server)
        .get("/api/convert/?input=kg")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.hasAllKeys(res.body,['initNum','initUnit','returnNum','returnUnit','string'],"Object need initNum,initUnit,returnNum,returnUnit,string property");
        });
        chai.request(server)
    });
});
