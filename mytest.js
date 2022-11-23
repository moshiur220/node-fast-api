//   { full_name: { $regex: ".*" + req.query.name + ".*" } },
// Node js fs module with work
// https://kinsta.com/knowledgebase/nodejs-fs/
const fs = require("fs");
const generateController = require("./src/command/simple/controller");
// how to ceare a file

fs.writeFile("hello.js", generateController(), (error) => {
  if (error) {
    console.log("some thing went wrong");
  } else {
    console.log("file written");
  }
});

// edit file
/*
fs.appendFile("hello.js", "\nChange file", (error) => {
  if (error) {
    console.log("some thing went wrong");
  } else {
    console.log("file written");
  }
}); */
