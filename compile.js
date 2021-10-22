const path = require('path');
const fs = require('fs');
const solc = require('solc');


const rafflePath = path.resolve(__dirname, 'contracts', 'Raffle.sol');
const source = fs.readFileSync(rafflePath, 'utf8');

//console.log(solc.compile(source, 1)); //solc.compile returns an object

module.exports = solc.compile(source, 1).contracts[':Raffle'];