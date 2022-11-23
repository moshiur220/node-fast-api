const { Command } = require("commander");
const { init } = require("./src/command/cli");
const program = new Command();

program
  .name("cli")
  .description("CLI Commands for Node Express fast API")
  .version("0.0.1");

init(program);

/**
 * * add your commands here
 * * use commander to add commands, https://www.npmjs.com/package/commander
 *
 *
 *
 **/

program.parse(process.argv);
