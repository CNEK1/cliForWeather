#!/usr/bin/env node
import { findArgs } from './helpers/argsHelper.js';
import { printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, VALUE_DICTIONARY } from './services/storage.service.js';
import { getCurrentWeather, getDailyWeather, getIcons } from './services/api.service.js';
import dotenv from 'dotenv';
import chalk from 'chalk';

//Config for DOTENV
dotenv.config();

//All Commands and Options of ClI
const yargsArg = findArgs();
yargsArg.parse(process.argv.slice(2));

const saveToken = async (token) => {
    try {
        await saveKeyValue(VALUE_DICTIONARY.token, token);
        printSuccess('Token Saved');
    } catch (error) {
        printError(error.message);
    }
};

const getWholeForecast = async (city) => {
    try {
        const weather = await getCurrentWeather(city);
        printWeather(weather);
    } catch (error) {
        printError(error);
    }
};
const getForecast = async (city) => {
    try {
        const forecastWeather = await getDailyWeather(city);
        printForecastWeather(forecastWeather);
    } catch (error) {
        printError(error);
    }
};

//Print for Daily

const printWeather = (res) => {
    console.log(
        `${chalk.bgCyan('\t\t DAILY WEATHER INFO ')} \n\nCity: ${chalk.blue(res.data.name)} \nCountry: ${res.data.sys.country}\n\n${getIcons(res.data.weather[0].icon)}  ${
            res.data.weather[0].description
        }
       \nTemperatures: { Temp: ${chalk.green(res.data.main.temp + '°')} Feels Like: ${chalk.green(res.data.main.temp + '°')}} \nHumidity: ${res.data.main.humidity}%`
    );
};

//Print for Forecast

const printForecastWeather = (res) => {
    console.log(
        `${chalk.bgCyan('\t\t FORECAST WEATHER INFO ')} \n\nCity: ${chalk.blue(res.data.city.name)}\nCountry: ${res.data.city.country}\nPopulation: ${
            res.data.city.population
        } 🧑‍🤝‍🧑\nСoordinates: {latitude: ${res.data.city.coord.lat} longitude: ${res.data.city.coord.lon}}\n\n${getIcons(res.data.list[0].weather[0].icon)}  ${res.data.list[0].weather[0].description}
        \nTemperatures:
    {
        temp: ${chalk.green(res.data.list[0].main.temp + '°')}
        feels like: ${chalk.green(res.data.list[0].main.feels_like + '°')}
        min: ${chalk.green(res.data.list[0].main.temp_min + '°')}
        max: ${chalk.green(res.data.list[0].main.temp_max + '°')}
        pressure: ${chalk.green(res.data.list[0].main.pressure)}
        sea level: ${chalk.green(res.data.list[0].main.sea_level)}
        ground level: ${chalk.green(res.data.list[0].main.grnd_level)}
        humidity: ${chalk.green(res.data.list[0].main.humidity + '%')}
    }

Clouds: ${chalk.green(res.data.list[0].clouds.all + '%')}
Visibility: ${chalk.green(res.data.list[0].visibility)}

Wind: 
    {
        speed: ${chalk.green(res.data.list[0].wind.speed)}
        deg: ${chalk.green(res.data.list[0].wind.deg)}
    }
    `
    );
};

const initCli = () => {
    if (yargsArg.argv.s) {
        getWholeForecast(yargsArg.argv.s);
    }
    if (yargsArg.argv.t) {
        saveToken(yargsArg.argv.t);
    }
    if (yargsArg.argv.d) {
        getForecast(yargsArg.argv.d);
    }
};

initCli();
