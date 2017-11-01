var _ = require("underscore")._;

var MembershipApplication = function (args) {
    _.extend(this, args);

    this.emailIsValid = function () {
        if (this.email && this.email.length > 3 && this.email.indexOf("@") > -1)
            return true;
        else
            return false;
    };

    this.heightIsValid = function () {
        if (this.height && this.height > 60 && this.height < 75)
            return true;
        else
            return false;
    };

    this.ageIsValid = function () {
        if (this.age && this.age < 100 && this.age > 15)
            return true;
        else
            return false;
    };

    this.weightIsValid = function () {
        if (this.weight && this.weight > 100 && this.weight < 300)
            return true;
        else
            return false;
    };

    this.nameIsValid = function () {
        if (this.first && this.last)
            return true;
        else
            return false;
    };

    this.isValid = function () {
        return this.emailIsValid() &&
            this.heightIsValid() &&
            this.ageIsValid() &&
            this.weightIsValid() &&
            this.nameIsValid();
    };
};

module.exports = MembershipApplication;