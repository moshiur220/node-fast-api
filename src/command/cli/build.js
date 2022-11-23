const fs = require("fs");
const path = require("path");
const generateController = require("../simple/controller");
const generateModel = require("../simple/model");
const generateRoute = require("../simple/route");
const generateService = require("../simple/service");
const generateValidation = require("../simple/validation");
//https://blog.logrocket.com/using-writefilesync-node-js/
/**
 * Creates a controller file for the given controller name.
 * @param {string} name - The name of the controller.
 * @returns None
 */
exports.buildController = async (name) => {
  controller(name);
  model(name);
  route(name);
  service(name);
  validator(name);
};

// controller generate function
function controller(name) {
  const filePath = path.join(
    __dirname,
    "../../controllers",
    `${name}.controller.js`
  );

  if (fs.existsSync(filePath)) {
    console.log(`Controller ${name} already exists.`);
    return;
  }

  fs.writeFile(filePath, generateController(name), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Controller ${name}.controller.js created successfully`);
    }
  });
}

// Model generate function
function model(name) {
  const filePath = path.join(__dirname, "../../models", `${name}.model.js`);

  if (fs.existsSync(filePath)) {
    console.log(`model ${name} already exists.`);
    return;
  }

  fs.writeFile(filePath, generateModel(name), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`model ${name}.model.js created successfully`);
    }
  });
}

// generate route

function route(name) {
  const filePath = path.join(__dirname, "../../routes/v1", `${name}.route.js`);

  if (fs.existsSync(filePath)) {
    console.log(`Route ${name} already exists.`);
    return;
  }

  fs.writeFile(filePath, generateRoute(name), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Route ${name}.route.js created successfully`);
    }
  });
}

// generate services
function service(name) {
  const filePath = path.join(__dirname, "../../services", `${name}.service.js`);

  if (fs.existsSync(filePath)) {
    console.log(`Service ${name} already exists.`);
    return;
  }

  fs.writeFile(filePath, generateService(name), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Service ${name}.service.js created successfully`);
    }
  });
}
// generate validations
function validator(name) {
  const filePath = path.join(
    __dirname,
    "../../validations",
    `${name}.validation.js`
  );

  if (fs.existsSync(filePath)) {
    console.log(`validation ${name} already exists.`);
    return;
  }

  fs.writeFile(filePath, generateValidation(name), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`validation ${name}.validation.js created successfully`);
    }
  });
}
