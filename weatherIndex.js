#!/usr/bin/env node 
import { findArgs } from "./helpers/argsHelper.js";
import { printError,printSuccess } from "./services/log.service.js";
import {saveKeyValue,VALUE_DICTIONARY} from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

//All Commands and Options of ClI
const yargsArg = findArgs();
yargsArg.parse(process.argv.slice(2));

const saveToken = async(token) => {
    try {
      await saveKeyValue(VALUE_DICTIONARY.token,token)
      printSuccess("Token Saved");
    } catch (error) {
      printError(error.message);
    }
}


if(yargsArg.argv.s){
  getWeather(yargsArg.argv.s);
}
if(yargsArg.argv.t){
  saveToken(yargsArg.argv.t);
}




