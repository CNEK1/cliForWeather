#!/usr/bin/env node 
import { findArgs } from "./helpers/argsHelper.js";
import { printError,printSuccess } from "./services/log.service.js";
import {saveKeyValue,getKeyValue} from "./services/storage.service.js";

//All Commands and Options of ClI
const yargsArg = findArgs();
yargsArg.parse(process.argv.slice(2));

const saveToken = async(token) => {
    try {
      await saveKeyValue("token",token)
      printSuccess("Token Saved");
    } catch (error) {
      printError(error.message);
    }
}

if(yargsArg.argv.s){
  printSuccess(yargsArg.argv.s);
}
if(yargsArg.argv.t){
  saveToken(yargsArg.argv.t);
}


