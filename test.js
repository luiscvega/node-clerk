var clerk = require("./");
var assert = require("assert");

describe("Clerk", function () {

  describe("with no validations", function () {
    it("should work", function (done) {
      var createUser = clerk();

      createUser({}, function (err, attrs) {
        assert.equal(err, undefined);
        assert.deepEqual(attrs, {});
      });

      done();
    });
  });

  describe("with synchronous validations", function () {
    describe("and with invalid input", function () {
      it("should work", function (done) {
        var createUser = clerk();

        createUser.validate(function (attrs) {
          return attrs.name && attrs.name.length > 0;
        }, "Name should be present.");

        createUser({}, function (err, attrs) {
          assert.equal(err.messages, ["Name should be present"]);
        });

        done();
      });
    });
  });

});
