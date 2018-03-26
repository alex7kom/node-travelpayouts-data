#!/usr/bin/env node

const path = require('path');

const downloadData = require('dl-data');

downloadData(path.join(__dirname, '..'), require('./files.json'))
  .then(() => {
    console.log('All files downloaded!');
  });
