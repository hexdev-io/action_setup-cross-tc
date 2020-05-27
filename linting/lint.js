const CLIEngine = require('eslint').CLIEngine;
const {join} = require("path")
 

const pkgMetaUrl = require.resolve("@hexdev/ts-linting");
console.error(pkgMetaUrl, __dirname, __filename);

const pkgMetaDir = __dirname
const pkgMetaJsonUrl = join(__dirname, "package.json");
const pkgMetaIndex= join(__dirname, "index.js");

const pkgMetaJson = require(pkgMetaJsonUrl);
console.log(pkgMetaJson)
 

console.log("---") 
const fix = false;

const eslint = new CLIEngine({ cwd: process.cwd(), fix ,
configFile: pkgMetaIndex  });
const report = eslint.executeOnFiles(["./src/**/*.ts"]);
CLIEngine.outputFixes(report);
console.log(report.results);