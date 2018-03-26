'use strict';

const jsonQuery = require('json-query');

module.exports = function(fileName, opts = {}) {
  const options = Object.assign({}, opts, {
    data: require('../data/' + fileName)
  });

  return function(query) {
    return jsonQuery(query, options);
  };
};
