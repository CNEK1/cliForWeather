import axios from "axios";
import { getKeyValue,VALUE_DICTIONARY } from "./storage.service.js";
import { printError } from "./log.service.js";


//API TOKEN

const TOKEN = await getKeyValue(VALUE_DICTIONARY.token);

//Current Weather Data
const getCurrentWeather = async (city) => {
    
    try {
        const response = await axios.get(process.env.API_ADDRESS, {
            params: {
                q:city,
                appid: TOKEN,
                lang: "en",
                units: "metric"
            }
        })
        console.log(response);
    } catch (error) {
        printError(error);
    }
}; 

//Hourly Forecast 4 days

// const getDailyWeather = async (city) => {
//     try {
//         const response = await axios.get(process.env.FORECAST_API_ADDRESS, {
//             params: {
//                 q:city,
//                 appid: TOKEN,
//                 cnt: 1
//                 lang: "en",
//                 units: "metric"
//             }
//         })
//         console.log(response);
//     } catch (error) {
//         printError(error);
//     }
// }; 

export {getCurrentWeather}