# Travelpayouts Data для Node.js

[In English](README-en.md)

Модуль, который автоматически загружает, кеширует, оборачивает [файлы данных Travelpayouts](https://support.travelpayouts.com/hc/ru/articles/203956163#09) с помощью [json-query](https://github.com/mmckegg/json-query) и позволяет выполнять к ним запросы.

[Список доступных языков и файлов](https://api.travelpayouts.com/data/). Обратите внимание, что файлы, лежащие прямо в корне, не поддерживаются.

## Установка

```
npm i travelpayouts-data
```

## Использование

Подключите модуль:

```js
const loadData = require('travelpayouts-data');
```

После этого можно загружать нужные файлы:

```js
const { query, raw } = await loadData('ru', 'cities');
```

И делать запросы:

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

Подробнее язык запросов описан на [странице модуля json-query](https://github.com/mmckegg/json-query). `loadData` выше также поддерживает необязательный третий аргумент, значение которого передается `json-query` в качестве параметра `options`.

## API

### loadData(language, fileName, [queryOpts])

Асинхронная функция, которая возвращает промис.

Параметры:

- `language` — язык файла
- `fileName` — название файла
- `queryOpts` (необязательно) — опции [json-query](https://github.com/mmckegg/json-query)

В случае успеха значением промиса будет объект:

```js
{
  query, raw;
}
```

где:

- `query` — функция запроса [json-query](https://github.com/mmckegg/json-query)
- `raw` — оригинальные данные

## Примеры

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

## Лицензия

Файлы данных 2016-present © Travelpayouts

Код данного проекта:

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
