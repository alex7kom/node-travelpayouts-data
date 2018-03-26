# Travelpayouts Data для Node.js

[In English](README-en.md)

Микромодуль, который оборачивает [файлы данных Travelpayouts](https://support.travelpayouts.com/hc/ru/articles/203956163#09) с помощью [json-query](https://github.com/mmckegg/json-query) и позволяет выполнять к ним запросы.

Файлы скачиваются при установке модуля. В комплекте с модулем идет cli-утилита для обновления файлов.

# Установка

```
npm i travelpayouts-data
```

# Использование

## Модуль

Загрузите модуль:

```js
var loadData = require('travelpayouts-data');
```

После этого можно загружать нужные файлы:

```js
var queryCities = loadData('cities');
```

И делать запросы:

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

Подробнее язык запросов описан на [странице модуля json-query](https://github.com/mmckegg/json-query). `loadData` выше также поддерживает необязательный второй аргумент, значение которого передается `json-query` в качестве параметра `allowRegexp`.

Вы также можете загружать файлы данных напрямую:

```js
var cities = require('travelpayouts-data/data/cities');
```

## Обновление файлов

Запуск с помощью утилиты `npx`, идущей в комплекте с `npm`:

```
npx travelpayouts-data-update
```

# Доступные файлы

* `airlines` — [авиакомпании](https://support.travelpayouts.com/hc/ru/articles/203956163#12)
* `airlines_alliances` — [альянсы](https://support.travelpayouts.com/hc/ru/articles/203956163#13)
* `airports` — [аэропорты](https://support.travelpayouts.com/hc/ru/articles/203956163#11)
* `cases` — [города IATA со склонениями по падежам](https://support.travelpayouts.com/hc/ru/articles/203956063-%D0%91%D0%B0%D0%B7%D1%8B-IATA)
* `cities` — [города](https://support.travelpayouts.com/hc/ru/articles/203956163#10)
* `countries` — [страны](https://support.travelpayouts.com/hc/ru/articles/203956163#09)
* `planes` — [самолеты](https://support.travelpayouts.com/hc/ru/articles/203956163#14)
* `routes` — [маршруты](https://support.travelpayouts.com/hc/ru/articles/203956163#15)

# Примеры

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

# Лицензия

Файлы данных 2016 © Travelpayouts

Код данного проекта:

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
