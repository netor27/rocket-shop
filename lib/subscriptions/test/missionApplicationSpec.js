"use strict";

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
        it("all validators successful", function () {
            validApp.isValid().should.be.True("Not valid");
        });
    });

    describe("Application invalid if...", function () {

        it("expired", function(){
            var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")});
            app.expired().should.be.True();
        });

        it('email is 4 characters or less', function () {
            var app = new MembershipApplication({ email: "dd" });            
            app.emailIsValid().should.be.False();
        });
        it('email does not contain an @', function () {
            var app = new MembershipApplication({ email: "thingthingthing:thing.com" });
            app.emailIsValid().should.be.False();
        });
        it('email is omitted', function () {
            var app = new MembershipApplication();
            app.emailIsValid().should.be.False();
        });
        it('height is less than 60 inches', function () {
            var app = new MembershipApplication({ height: 10 });
            app.heightIsValid().should.be.False();
        });
        it('height is more than 75 inches', function () {
            var app = new MembershipApplication({ height: 80 });
            app.heightIsValid().should.be.False();
        });
        it('height is omitted', function () {
            var app = new MembershipApplication();
            app.heightIsValid().should.be.False();
        });
        it('age is more than 100', function () {
            var app = new MembershipApplication({ age: 101 });
            app.ageIsValid().should.be.False();
        });
        it('age less than 15', function () {
            var app = new MembershipApplication({ age: 14 });
            app.ageIsValid().should.be.False();
        });
        it('age is omitted', function () {
            var app = new MembershipApplication();
            app.ageIsValid().should.be.False();
        });
        it('weight less than 100', function () {
            var app = new MembershipApplication({ weight: 99 });
            app.weightIsValid().should.be.False();
        });
        it('weight less more than 300', function () {
            var app = new MembershipApplication({ weight: 301 });
            app.weightIsValid().should.be.False();
        });
        it('weight is omitted', function () {
            var app = new MembershipApplication({ weight: 301 });
            app.weightIsValid().should.be.False();
        });
        it('first is omitted', function () {
            var app = new MembershipApplication();
            app.nameIsValid().should.be.False();
        });
        it('last is omitted', function () {
            var app = new MembershipApplication();
            app.nameIsValid().should.be.False();
        });
    });
});