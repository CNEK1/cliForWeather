import axios from "axios";
import { VALUE_DICTIONARY,getKeyValue } from "./storage.service.js";
import { printError } from "./log.service.js";

const getWeather = async (city) => {
    const token = await getKeyValue(VALUE_DICTIONARY.token)
    try {
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q:city,
                appid: token,
                lang: "en",
                units: "metric"
            }
        })
        console.log(response);
    } catch (error) {
        printError(error);
    }
}; 

export {getWeather};