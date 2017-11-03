var Billing = require("./processes/billing");
var stripe = require("stripe")("XYZ_privateKey_XYZ");
var billing = new Billing({ stripeKey: "XYZ_privateKey_XYZ" });
var fs = require("fs");

stripe.plans.create({
    amount: 5000,
    interval: "month",
    name: "commander",
    currency: "usd",
    id: "commander"
}, function (err, plan) {
    // asynchronously called
    if (err) {
        console.log(err);
    } else {
        billing.createSubscription({
            email: "test1@test.com",
            name: "Neto R",
            plan: "commander",
            source: "tok_visa",
        }, function (err, res) {
            if(err){
            console.log(err);
            }else{
                console.log("Success");
                console.log(res);
            }
        });
    }
});
