# Clerk
Validate input with callback

## Usage

```javascript
var createUser = clerk();

createUser.validate(function (attrs) {
  return attrs.name && attrs.name.length > 0;
  }, "Name should be present.");

createUser({}, function (err, attrs) {
  assert.equal(err.messages, ["Name should be present"]); // true
});
```
