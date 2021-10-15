const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Get',function(){
        chai
        .request(server)
        .get("/api/convert?input=10L")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.containsAllKeys(res.body,{initNum:1,initUnit:"",returnNum:1,returnUnit:"",string:""},"Object need initNum,initUnit,returnNum,returnUnit,string property");
        });
        chai
        .request(server)
        .get("/api/convert?input=32g")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.equal(res.text,"invalid unit");
        });
        chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.equal(res.text,"invalid number");
        });
        chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.equal(res.text,"invalid number and unit");
        });
        chai
        .request(server)
        .get("/api/convert?input=kg")
        .end(function(err,res) {
            assert.equal(res.status, 200 , 'Response status should be 200');
            assert.containsAllKeys(res.body,{initNum:1,initUnit:"",returnNum:1,returnUnit:"",string:""},"Object need initNum,initUnit,returnNum,returnUnit,string property");
        });
    });
});
