// src/services/blockchainService.js

const { Web3 } = require('web3');
const HealthRecordABI = require('../../../blockchain/build/contracts/HealthRecord.json').abi;

// Connect to Ganache using IPv4
const web3 = new Web3('http://127.0.0.1:7545');

// Contract address (replace with your deployed contract address)
const contractAddress = '0xE317c2AD2a1568aCf19446DDa43E18B0dE47A454';

// Create a contract instance
const healthRecordContract = new web3.eth.Contract(HealthRecordABI, contractAddress);

// Add a new health record to the blockchain
const addRecord = async (patientId, doctorId, data) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await healthRecordContract.methods
      .addRecord(patientId, doctorId, data)
      .send({ from: accounts[0], gas: 3000000 });

    return result;
  } catch (error) {
    console.error('Failed to add record to blockchain:', error);
    throw new Error('Failed to connect to the blockchain network.');
  }
};

// Get all records for a patient from the blockchain
const getRecordsByPatient = async (patientId) => {
  try {
    const result = await healthRecordContract.methods
      .getRecordsByPatient(patientId)
      .call();

    return result;
  } catch (error) {
    console.error('Failed to fetch records from blockchain:', error);
    throw new Error('Failed to connect to the blockchain network.');
  }
};

module.exports = { addRecord, getRecordsByPatient };