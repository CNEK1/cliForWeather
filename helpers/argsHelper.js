import yargs from "yargs";

const findArgs = () => {
const y = yargs()
y.version('1.0.0')

// --- ADD OPTIONS ----
return y.options('s', {
  alias: "search",
  required: false,  
  describe: "Weather in seatch town",
  type: "string",
})
.options('t', {
  alias: "token",
  required: false,
  describe: "Saving our token",
  type: "string",
})

}


export {findArgs};