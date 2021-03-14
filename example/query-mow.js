'use strict';

const loadData = require('../');

async function load() {
  const { query } = await loadData('ru', 'cities');

  console.log(query('[*][code=MOW]').value);
}

load();
