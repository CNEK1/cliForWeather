import axios from 'axios';
import { getKeyValue, VALUE_DICTIONARY } from './storage.service.js';
import { printError } from './log.service.js';

//API TOKEN

const TOKEN = await getKeyValue(VALUE_DICTIONARY.token);

//Current Weather Data
const getCurrentWeather = async (city) => {
    try {
        return await axios.get(process.env.API_ADDRESS, {
            params: {
                q: city,
                appid: TOKEN ?? process.env.TOKEN,
                lang: 'en',
                units: 'metric'
            }
        });
    } catch (error) {
        printError(error);
    }
};

//Hourly Forecast 4 days

const getDailyWeather = async (city) => {
    try {
        return await axios.get(process.env.FORECAST_API_ADDRESS, {
            params: {
                q: city,
                appid: TOKEN ?? process.env.TOKEN,
                cnt: 1,
                lang: 'en',
                units: 'metric'
            }
        });
    } catch (error) {
        printError(error);
    }
};

//Some pretty icons 0__0

const getIcons = (icon) => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '🌞';
        case '02':
            return '🌤️';
        case '03':
            return '🌥️';
        case '04':
            return '☁️';
        case '09':
            return '🌧️';
        case '10':
            return '🌦️';
        case '11':
            return '⛈️';
        case '13':
            return '🌨️';
        case '50':
            return '🌖';
    }
};

export { getCurrentWeather, getDailyWeather, getIcons };
