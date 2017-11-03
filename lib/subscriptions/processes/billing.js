var assert = require("assert");

var Billing = function (args) {
    assert(args.stripeKey, "Need a stripe key");
    var stripe = require("stripe")(args.stripeKey);

    this.createSubscription = function (args, next) {
        //we need an email, name, plan and a source (cardToken)
        assert(args.email && args.name && args.plan && args.source);
        //send off to stripe
        stripe.customers.create({
            email: args.email,
            description: args.name,
            source: args.source,
            plan: args.plan
        }, next);
    };

    this.cancelSubscription = function (args, next) {
        // TODO: develop this
    };

    this.changeSubscription = function (args, next) {
        // TODO: develop this
    };

};

module.exports = Billing;