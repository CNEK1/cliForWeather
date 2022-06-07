#!/usr/bin/env node
import { findArgs } from './helpers/argsHelper.js';
import { printError, printSuccess } from './services/log.service.js';
import { saveKeyValue, VALUE_DICTIONARY } from './services/storage.service.js';
import { getCurrentWeather } from './services/api.service.js';
import dotenv from 'dotenv';
import chalk from 'chalk';

//Config for DOTENV
dotenv.config();

//All Commands and Options of ClI
const yargsArg = findArgs();
yargsArg.parse(process.argv.slice(2));

const saveToken = async (token) => {
    try {
        await saveKeyValue(process.env.TOKEN ?? VALUE_DICTIONARY.token, token);
        printSuccess('Token Saved');
    } catch (error) {
        printError(error.message);
    }
};

const getWholeForecast = async (city) => {
    try {
        const weather = await getCurrentWeather(city);
        PrintWeather(weather);
    } catch (error) {
        // if (error.response.status == 404) {
        //     printError('Prikol1');
        // } else if (error.status == 401) {
        //     printError('Prikol');
        // } else {
        //     printError(e.message);
        // }
    }
};

const PrintWeather = (res) => {
    console.log(res.data.weather[0]);
    console.log(
        `${chalk.bgCyan('\t\t WEATHER INFO ')} \nCity: ${chalk.blue(res.data.name)} \nCountry: ${res.data.sys.country} \nTemperatures: { Temp: ${chalk.green(
            res.data.main.temp + '°'
        )} Feels Like: ${chalk.green(res.data.main.temp + '°')}} \nHumidity: ${res.data.main.humidity}%`
    );
};

const initCli = () => {
    if (yargsArg.argv.s) {
        getWholeForecast(yargsArg.argv.s);
    }
    if (yargsArg.argv.t) {
        saveToken(yargsArg.argv.t);
    }
};

initCli();
