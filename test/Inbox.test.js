const assert = require('assert');
const ganache = require('ganache-cli');
const { getMaxListeners } = require('process');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile'); //from compile we are exporting object with key ':Inbox' which has interface and bytecode

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy
    // the contract                                            we want to send javascript object hence using JSON.parse
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //Contract here is contructor function so we are making an instance of contract
      .deploy({ data: bytecode, arguments: ['Hi there!'] }) // "hi there" is the initial message as defined in our contract in Inbox.sol
      .send({ from: accounts[0], gas: '1000000' }) //for sending a trasaction to our test netwokr for actually creating the contract
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        //console.log(accounts)
        // console.log(inbox);             //if it got the address it means it is deployed
        assert.ok(inbox.options.address); //ok checks if the value inside of it exists i.e if it is a defined value
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    })

    it('can change the message',async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });  //for setting we have to send from an account
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    });
})

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//      car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });