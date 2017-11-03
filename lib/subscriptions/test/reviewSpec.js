var assert = require("assert");
var ReviewProcess = require("../processes/review");
var Mission = require("../models/mission");
var Helpers = require("./helpers");
var DB = require("../db");
var Billing = require("../processes/billing");
var _ = require("underscore")._;
var nock = require("nock");

describe("The Review Process", function () {
    var db = new DB();
    before(function (done) {
        db.clearStores(done);
    });
    var billing = new Billing({ stripeKey: "xxx" });

    describe('Receiving a valid application', function () {
        var decision, review, validApp = Helpers.validApplication;
        before(function (done) {

            var goodCall = nock("https://api.stripe.com/v1")
                .post("/customers")
                .reply(200, Helpers.goodStripeResponse);

            review = new ReviewProcess({
                application: validApp,
                db: db,
                billing: billing
            });

            review.processApplication(function (err, result) {
                decision = result;
                done();
            });
        });
        it('returns success', function () {
            assert(decision.success, decision.message);
        });
        it('returns an assignment', function () {
            assert(decision.assignment);
        });
        it('returns a subscription', function () {
            assert(decision.subscription);
        });
    });
    describe('Valid application, failed billing', function () {
        var decision, review, badBillingApp = _.clone(Helpers.validApplication);
        
        //use this to trip up the billing... although this is a stub
        badBillingApp.source = 2;
        before(function (done) {

            var badCall = nock("https://api.stripe.com/v1")
                .post("/customers")
                .reply(402, Helpers.badStripeResponse);

            review = new ReviewProcess({
                application: badBillingApp,
                db: db,
                billing: billing
            });

            review.processApplication(function (err, result) {
                decision = result;
                done();
            });
        });
        it('returns false for success', function () {
            assert(!decision.success);
        });
    });
});