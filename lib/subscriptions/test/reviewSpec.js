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

        var review = new ReviewProcess({ application: validApp });
        sinon.spy(review, "ensureAppValid");
        sinon.spy(review, "findNextMission");
        sinon.spy(review, "roleIsAvailable");
        sinon.spy(review, "ensureRoleCompatible");

        before(function (done) {
            review.processApplication(function (err, result) {
                console.log(result);
                decision = result;
                done();
            });
        });

        it('returns success', function () {
            decision.success.should.be.True(decision.message);
        });

        it("ensures the application is valid", function () {
            review.ensureAppValid.called.should.be.True();
        });

        it("selects a mission", function () {
            review.findNextMission.called.should.be.True();
        });

        it("ensures a role exists", function () {
            review.roleIsAvailable.called.should.be.True();
        });

        it("ensures the role is compatible", function () {
            review.ensureRoleCompatible.called.should.be.True();
        });

    });
});