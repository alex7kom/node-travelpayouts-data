#!/usr/bin/env node

'use strict';

const path = require('path');

const downloadData = require('dl-data');

const baseDir = path.join(__dirname, '..');
const files = require('./files.json');

downloadData(baseDir, files, {
  retry: {
    retries: 10,
    statusCodes: [404, 408, 413, 429, 500, 502, 503, 504]
  }
}).then(() => {
  console.log('All files downloaded!');
});
