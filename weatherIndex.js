#!/usr/bin/env node 
import { findArgs } from "./helpers/argsHelper.js";
import { printError,printSuccess } from "./services/log.service.js";

//All Commands and Options of ClI
const yargsArg =  findArgs();
yargsArg.parse(process.argv.slice(2));

if(yargsArg.argv.s){
  printSuccess(yargsArg.argv.s);
}
else if(yargsArg.argv.t){
  printSuccess(yargsArg.argv.t);
}
else {
  printError();
}



