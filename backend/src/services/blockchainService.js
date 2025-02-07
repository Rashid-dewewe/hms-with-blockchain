// src/services/blockchainService.js
const { Web3 } = require('web3'); // Correctly import Web3
const HealthRecordABI = require('../../../blockchain/build/contracts/HealthRecord.json').abi;

// Connect to the blockchain network
const web3 = new Web3('http://localhost:7545'); // Ganache URL

// Contract address (replace with your deployed contract address)
const contractAddress = '0x7617dE0E8a3F5643789AbE192bCA8531149b35aC';

// Create a contract instance
const healthRecordContract = new web3.eth.Contract(HealthRecordABI, contractAddress);

// Add a new health record to the blockchain
const addRecord = async (patientId, doctorId, data) => {
  const accounts = await web3.eth.getAccounts();
  const result = await healthRecordContract.methods
    .addRecord(patientId, doctorId, data)
    .send({ from: accounts[0], gas: 3000000 });

  return result;
};

// Get all records for a patient from the blockchain
const getRecordsByPatient = async (patientId) => {
  const result = await healthRecordContract.methods
    .getRecordsByPatient(patientId)
    .call();

  return result;
};

module.exports = { addRecord, getRecordsByPatient };