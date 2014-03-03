module.exports = function () {
  var syncValidations = [];
  var asyncValidations = [];

  function flow(attributes, done) {
    var index = 0;
    var error = new Error("Outflow");
    error.messages = [];

    syncValidations.forEach(function (validation) {
      if (!validation.assertion(attributes)) {
        error.messages.push(validation.message);
      };
    });

    function nextAsyncValidation(err) {
      var asyncValidation = asyncValidations[index++];

      if (err) error.messages.push(err);

      if (!asyncValidation) {
        if (error.messages.length === 0) {
          done(null, attributes);
        } else {
          done(error, attributes);
        }
        return;
      };

      try {
        asyncValidation(attributes, done, nextAsyncValidation);
      } catch (e) {
        return done(e);
      };
    };

    nextAsyncValidation();
  };

  flow.validateSync = function (assertion, message) {
    syncValidations.push({ assertion: assertion, message: message });
  };

  flow.validate = function (thing) {
    asyncValidations.push(thing);
  };

  flow.error = function (template) {
    return function (err, req, res, next) {
      if (err.toString() === "Error: Outflow") {
        return res.render(template, { errors: err.messages });
      };

      next(err);
    };
  };

  return flow;
};
