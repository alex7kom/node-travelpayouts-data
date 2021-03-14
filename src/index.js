'use strict';

const fs = require('fs');
const util = require('util');

const axios = require('axios');
const jsonQuery = require('json-query');
const findCacheDir = require('find-cache-dir');
const mkdirp = require('mkdirp');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const getCacheFile = findCacheDir({ name: 'travelpayouts-data', thunk: true });

const cacheTime = 24 * 60 * 60 * 1000; // 1 day

module.exports = loadData;

function createQuery(rawData, opts = {}) {
  const options = Object.assign({}, opts, { rootContext: rawData });

  return query => jsonQuery(query, options);
}

function getCacheFileNames(language, fileName) {
  const localFileName = `${language}_${fileName}.json`;
  const localFileNameMeta = `${localFileName}.meta`;

  return {
    localFileName,
    localFileNameMeta
  };
}

function getDataUrl(language, fileName) {
  return `https://api.travelpayouts.com/data/${language}/${fileName}.json`;
}

async function getDataFromCache(language, fileName) {
  const { localFileName, localFileNameMeta } = getCacheFileNames(
    language,
    fileName
  );

  const metaData = JSON.parse(
    await readFile(getCacheFile(localFileNameMeta), 'utf-8')
  );

  if (Date.now() - metaData.timestamp > cacheTime) {
    throw new Error('Cache is expiried');
  }

  const cacheData = JSON.parse(
    await readFile(getCacheFile(localFileName), 'utf-8')
  );

  return cacheData;
}

async function saveDataToCache(language, fileName, dataToSave) {
  const { localFileName, localFileNameMeta } = getCacheFileNames(
    language,
    fileName
  );

  await mkdirp(getCacheFile());
  await Promise.all([
    writeFile(
      getCacheFile(localFileNameMeta),
      JSON.stringify({ timestamp: Date.now() })
    ),
    writeFile(getCacheFile(localFileName), JSON.stringify(dataToSave))
  ]);
}

async function downloadData(language, fileName) {
  const response = await axios({
    url: getDataUrl(language, fileName)
  });

  return response.data;
}

async function obtainData(language, fileName) {
  try {
    return await getDataFromCache(language, fileName);
  } catch (error) {
    // ignore error
  }

  const networkData = await downloadData(language, fileName);

  saveDataToCache(language, fileName, networkData);

  return networkData;
}

async function loadData(language, fileName, queryOpts) {
  const rawData = await obtainData(language, fileName);

  return {
    query: createQuery(rawData, queryOpts),
    raw: rawData
  };
}
