'use strict';

const jsonQuery = require('json-query');

module.exports = function(fileName, allowRegexp) {
  const data = {
    data: require('../data/' + fileName),
    allowRegexp: Boolean(allowRegexp)
  };

  return function(query) {
    return jsonQuery(query, data);
  };
};
