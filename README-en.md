# Travelpayouts Data for Node.js

[На русском](README.md)

A micromodule that wraps [Travelpayouts data files](https://support.travelpayouts.com/hc/en-us/articles/203956163-Data-Access-API#05) using [json-query](https://github.com/mmckegg/json-query) and allows to query them.

# Install

```
npm i travelpayouts-data
```

# Use

Load the module:

```js
var loadData = require('travelpayouts-data');
```

Then load the needed file:

```js
var queryCities = loadData('cities');
```

Query it:

```js
> queryCities('[*][code=MOW]').value
{ code: 'MOW',
  name: 'Moscow',
  coordinates: { lon: 37.617633, lat: 55.755786 },
  time_zone: 'Europe/Moscow',
  name_translations:
   { de: 'Moskau',
     en: 'Moscow',
     'zh-CN': '莫斯科',
     tr: 'Moscow',
     ru: 'Москва',
     it: 'Mosca',
     es: 'Moscú',
     fr: 'Moscou',
     th: 'มอสโก' },
  country_code: 'RU' }
```

Learn more about query language on [json-query page](https://github.com/mmckegg/json-query). `loadData` above also supports a second optional argument, which passed to `json-query` as `allowRegexp` param.

You can also load data files directly:

```js
var cities = require('travelpayouts-data/data/cities');
```

# Available files

Some of them are described on [the relevant support page](https://support.travelpayouts.com/hc/en-us/articles/203956163-Data-Access-API#05).

* `airlines`
* `airlines_alliances`
* `airports`
* `cases` — [IATA cities Russian names with grammatical cases](https://support.travelpayouts.com/hc/ru/articles/203956063-%D0%91%D0%B0%D0%B7%D1%8B-IATA)
* `cities`
* `countries`
* `planes`
* `routes`

# Examples

```js
> var queryRoutes = require('travelpayouts-data')('routes');
> queryRoutes('[*][*departure_airport_iata=DME]').value
[ { airline_iata: '2B',
    airline_icao: null,
    departure_airport_iata: 'DME',
    departure_airport_icao: null,
    arrival_airport_iata: 'AER',
    arrival_airport_icao: null,
    codeshare: false,
    transfers: 0,
    planes: [ 'CR2' ] },
  { airline_iata: '2B',
    airline_icao: null,
    departure_airport_iata: 'DME',
    departure_airport_icao: null,
    arrival_airport_iata: 'CEK',
    arrival_airport_icao: null,
    codeshare: false,
    transfers: 0,
    planes: [ 'CR2' ] },
    ... ]
```

```js
> var queryAirlines = require('travelpayouts-data')('airlines', true);
> queryAirlines('[*][name~/^Aeroflot/].callsign').value
'AEROFLOT'
> queryAirlines('[*][iata=S7].name').value
'S7 Airlines'
```

# License

Data files 2016 © Travelpayouts

This project source code:

The MIT License (MIT)

Copyright (c) 2016 Alexey Komarov <alex7kom@gmail.com>

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
