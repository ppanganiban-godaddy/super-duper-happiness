const { hideBin } = require('yargs/helpers');
const { writeFileSync } = require('fs');
const yargs = require('yargs/yargs');

const {
  copy = false,
  save = false
} = yargs(hideBin(process.argv)).argv;

module.exports = data => {
  if (copy) {
    const proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(JSON.stringify(data, null, 2));
    proc.stdin.end();
  }
  if (save) {
    const fileName = `./data/${new Date().toISOString()}.json`;
    writeFileSync(fileName, JSON.stringify(data, null, 2));
    console.log(`Saved to ${fileName}`)
  } else console.log(JSON.stringify(data, null, 2));
  return data;
};
