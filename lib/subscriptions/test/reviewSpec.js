var should = require("should");
var ReviewProcess = require("../processes/review");
var MembershipApplication = require("../models/membershipApplication");

describe('The Review Process', function () {
    describe("Receiving a valid application", function () {
        var decision;
        before(function (done) {
            validApp = new MembershipApplication({
                first: "Test",
                last: "User",
                email: "test@test.com",
                age: 30,
                height: 66,
                weight: 180,
            });

            var review = new ReviewProcess();
            review.processApplication(validApp, function (err, result) {
                decision = result;
                done();
            });
        });

        it('returns success', function () {
            decision.success.should.be.True(decision.message);
        });
    });
});