#!/usr/bin/env node 
import { findArgs } from "./helpers/argsHelper.js";
import { printError,printSuccess } from "./services/log.service.js";
import {saveKeyValue,VALUE_DICTIONARY} from "./services/storage.service.js";
import { getCurrentWeather } from "./services/api.service.js";
import dotenv from "dotenv";

//Config for DOTENV 
dotenv.config();

//All Commands and Options of ClI
const yargsArg = findArgs();
yargsArg.parse(process.argv.slice(2));

const saveToken = async(token) => {
    try {
      await saveKeyValue(process.env.TOKEN ?? VALUE_DICTIONARY.token,token)
      printSuccess("Token Saved");
    } catch (error) {
      printError(error.message);
    }
}

const initCli = () => {

if(yargsArg.argv.s){
  getCurrentWeather(yargsArg.argv.s);
}
if(yargsArg.argv.t){
  saveToken(yargsArg.argv.t);
}

};

initCli();



