# Travelpayouts Data for Node.js

[На русском](README.md)

This module downloads, caches and wraps [Travelpayouts data files](https://support.travelpayouts.com/hc/en-us/articles/203956163-Data-Access-API#05) using [json-query](https://github.com/mmckegg/json-query) to allow query them.

[The list of available languages and data files](https://api.travelpayouts.com/data/). Note that files in the root are not supported.

## Install

```
npm i travelpayouts-data
```

## Use

Load the module:

```js
const loadData = require('travelpayouts-data');
```

Then load the needed file:

```js
const { query, raw } = await loadData('ru', 'cities');
```

Query it:

```js
query('[*][code=MOW]').value
=> {
  time_zone: 'Europe/Moscow',
  name: 'Москва',
  coordinates: { lon: 37.617633, lat: 55.755786 },
  code: 'MOW',
  cases: {
    vi: 'в Москву',
    tv: 'Москвой',
    ro: 'Москвы',
    pr: 'Москве',
    da: 'Москве'
  },
  name_translations: { en: 'Moscow' },
  country_code: 'RU'
}
```

Learn more about query language on [json-query page](https://github.com/mmckegg/json-query). `loadData` above also supports a third optional argument, which passed to `json-query` as `allowRegexp` param.

## API

### loadData(language, fileName, [queryOpts])

An async function which returns a promise.

Options:

- `language` is the data file language
- `fileName` is the file name
- `queryOpts` (optional) is an object with options for [json-query](https://github.com/mmckegg/json-query)

A fullfilled promise will have an object as a value:

```js
{
  query, raw;
}
```

- `query` — a [json-query](https://github.com/mmckegg/json-query) function
- `raw` — the original data

## Examples

```js
const { query } = await loadData('ja', 'airports');
query('[*][*city_code=TYO]').value
=> [
  {
    time_zone: 'Asia/Tokyo',
    name: 'Tokyo Yokota AB',
    flightable: false,
    coordinates: { lon: 139.35, lat: 35.75 },
    code: 'OKO',
    name_translations: { en: 'Yokota AFB' },
    country_code: 'JP',
    city_code: 'TYO'
  },
  {
    time_zone: 'Asia/Tokyo',
    name: '東京国際空港',
    flightable: true,
    coordinates: { lon: 139.78453, lat: 35.54907 },
    code: 'HND',
    name_translations: { en: 'Haneda Airport' },
    country_code: 'JP',
    city_code: 'TYO'
  },
  ...]
```

```js
const { query } = await loadData('en', 'airlines', {
  allowRegexp: true
});
query('[*][name~/^Aeroflot/].code').value
=> 'SU'
query('[*][code=S7].name').value
=> 'S7 Airlines'
```

## License

Data files 2016-present © Travelpayouts

This project source code:

The MIT License (MIT)

Copyright (c) 2016-present Alexey Komarov <alex7kom@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
