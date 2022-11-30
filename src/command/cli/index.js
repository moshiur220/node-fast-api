const { buildController, buildRepository } = require("./build");

/**
 * Initializes the program.
 * @param {Program} program - The program object.
 * @returns none
 */
exports.init = async (program) => {
  program
    .command("g:c")
    .description("Build crud, Usage: node ebp build:crud <crud-name>")
    .argument("<crudName>", "crud Name")
    .action(async (crudName) => {
      console.log(`Building crud: ${crudName}`);
      await buildController(crudName);
    });

  // program
  //   .command("build:repository")
  //   .description(
  //     "Build Repository, Usage: node ebp build:repository <repository-name>"
  //   )
  //   .argument("<repositoryName>", "Repository Name")
  //   .action(async (repositoryName) => {
  //     console.log(`Building Repository: ${repositoryName}`);
  //     await buildRepository(repositoryName);
  //   });
};
