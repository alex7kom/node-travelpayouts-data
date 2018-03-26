#!/usr/bin/env node

'use strict';

const path = require('path');

const downloadData = require('dl-data');

const baseDir = path.join(__dirname, '..');
const files = require('./files.json');

downloadData(baseDir, files).then(() => {
  console.log('All files downloaded!');
});
