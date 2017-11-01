var assert = require("assert");
var should = require("should");
var MembershipApplication = require("../models/membershipApplication");

describe("Membership application requirements", function () {
    var validApp;
    before(function () {
        validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180,
        });
    });
    describe("Application valid if", function () {
        it("all validators successful", function(){
            validApp.isValid().should.be.True("Not valid");
        });
        it("email is 4 or more chars and contains an @", function(){
            validApp.emailIsValid().should.be.True("Invalid email");
        });
        it("height is between 60 and 75 inches", function(){
            validApp.heightIsValid().should.be.True("Invalid height");
        });
        it("age is between 15 and 100", function(){
            validApp.ageIsValid().should.be.True("Invalid age");
        });
        it("weight is between 100 and 300", function(){
            validApp.weightIsValid().should.be.True("Invalid weight");
        });
        it("first and last name are provided", function(){
            validApp.nameIsValid().should.be.True("Invalid name");
        });
    });
});