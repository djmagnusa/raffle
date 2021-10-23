const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());


const { interface, bytecode } = require('../compile');

let raffle;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    raffle = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode })
      .send({ from: accounts[0], gas: '1000000' });
});

describe('Raffle Contract', () => {
    it('deploys a contract', () => {
        assert.ok(raffle.options.address);
    })

    it('allows one account to enter', async() => {
        await raffle.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await raffle.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length)
    });

    it('allows multiple account to enter', async() => {
        await raffle.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await raffle.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await raffle.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await raffle.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        
        assert.equal(3, players.length)
    });

    it('requires a minimum amount of ether to enter', async () => {
        try{
            await lottery.methods.enter().send({
                 from: accounts[0],
                 value: 0
            });
 
            assert(false);
 
        } catch(err) {
            assert(err);
        }
         
     });

     
    it('only manager can call pickWinner', async () => {
        try {
          await raffle.methods.pickWinner().send({
            from: accounts[1] //not the manager
          });
          assert(false); //fail the test
        } catch(err) {
          assert(err);
        }
    })

   
    
});