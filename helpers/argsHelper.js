import yargs from "yargs";
import chalk from "chalk";

const findArgs = () => {
const y = yargs();
y.version('1.0.0');

// --- ADD OPTIONS ----
return y.help('h').alias('h', 'help').epilog('copyright 2022')
.example(chalk.bgCyan('$0 -s', '<weather in search town>'))
.options('s', {
  alias: "search",
  required: false,  
  describe: "Weather in seatch town",
  type: "string",
  nargs:1
})
.options('t', {
  alias: "token",
  required: false,
  describe: "Saving our token",
  type: "string",
  nargs: 1
})
}


export {findArgs};