var should = require("should");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membershipApplication");
var sinon = require("sinon");

describe('The Review Process', function () {
    describe("Receiving a valid application", function () {
        var decision;
        validApp = new MembershipApplication({
            first: "Test",
            last: "User",
            email: "test@test.com",
            age: 30,
            height: 66,
            weight: 180,
        });

        var review = new ReviewProcess();
        var validationSpy = sinon.spy();
        var missionSpy = sinon.spy();
        var roleAvailableSpy = sinon.spy();
        var roleCompatibleSpy = sinon.spy();
        
        before(function (done) {            
            review.on("validated", validationSpy);
            review.on("mission-selected", missionSpy);
            review.on("role-available", roleAvailableSpy);
            review.on("role-compatible", roleCompatibleSpy);
            review.processApplication(validApp, function (err, result) {
                decision = result;
                done();
            });
        });

        it('returns success', function () {
            decision.success.should.be.True(decision.message);
        });

        it("ensures the application is valid", function(){
            validationSpy.called.should.be.True();
        });

        it("selects a mission", function(){
            missionSpy.called.should.be.True();
        });

        it("ensures a role exis", function(){
            roleAvailableSpy.called.should.be.True();
        });

        it("ensures the role is compatible", function(){
            roleCompatibleSpy.called.should.be.True();
        });

    });
});