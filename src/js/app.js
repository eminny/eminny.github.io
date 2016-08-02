const _ = require('lodash');

console.log(_.map(['dog', 'cat', 'rat'], function (m) {
    return m.toUpperCase();
}));

