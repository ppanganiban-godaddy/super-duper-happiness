const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');

module.exports = yargs(hideBin(process.argv)).argv;
