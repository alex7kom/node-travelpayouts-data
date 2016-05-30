#!/bin/sh

mkdir data
wget -O data/countries.json http://api.travelpayouts.com/data/countries.json
wget -O data/cities.json http://api.travelpayouts.com/data/cities.json
wget -O data/airports.json http://api.travelpayouts.com/data/airports.json
wget -O data/airlines.json http://api.travelpayouts.com/data/airlines.json
wget -O data/airlines_alliances.json http://api.travelpayouts.com/data/airlines_alliances.json
wget -O data/planes.json http://api.travelpayouts.com/data/planes.json
wget -O data/routes.json http://api.travelpayouts.com/data/routes.json
wget -O data/cases.json https://support.travelpayouts.com/hc/ru/article_attachments/201561687/cases.json