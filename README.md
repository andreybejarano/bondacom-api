# API technical test Bondacom

> This project is API technical test Bondacom

## Technologies
- Node.js v8.9.1
- RethinkDB
- JavaScript 6, 7
- nvm

## Dependecies
- **Express** Framework web for Node.js
- **rethinkdb** Driver for rethink data base
- **Morgan** Request logger
- **Request-promise** HTTP request client with promise support 

## Developer Dependencies
- **AVA** JavaScript testing framework  
- **Eslint** A linter tool for identifying and reporting on patterns in JavaScript
- **Eslint plugins for standard** Rules standard for **Eslint**


## Install
> This project requires **Node.js** v8.9.1 or later
1. Use node version for project in file .nvmrc
``` shell
$ nvm use
```
2. Install dependencies
``` shell
$ npm install
```

## Run
``` shell
$ npm start
```

## Run test
``` shell
$ npm test
```

## Endpoints
> get weather: http://localhost:5000/weather
> return weather default for Argentina in spanish 
> ### Parameters
> - q=location, example http://localhost:5000/weather?q=Bogota
> - lang=Language, explample http://localhost:5000/weather?lang=fr
> get min and max weather for Argentina: http://localhost:5000/minMaxForecast

