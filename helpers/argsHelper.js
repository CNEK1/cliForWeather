import yargs from "yargs";

const findArgs = () => {
   const args = yargs(process.argv.slice(2)).argv;
   return args;
}


export {findArgs};