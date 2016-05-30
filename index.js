var jsonQuery = require('json-query');

module.exports = function (fileName, allowRegexp) {
  var data = {
    data: require('./data/' + fileName),
    allowRegexp: !!allowRegexp
  };

  return function (query) {
    return jsonQuery(query, data);
  };
};
