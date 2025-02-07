// contracts/HealthRecord.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract HealthRecord {
    struct Record {
        string patientId;
        string doctorId;
        string data;
        uint256 timestamp;
    }

    Record[] public records;

    event RecordCreated(string indexed patientId, string indexed doctorId, string data, uint256 timestamp);

    function addRecord(string memory _patientId, string memory _doctorId, string memory _data) public {
        records.push(Record({
            patientId: _patientId,
            doctorId: _doctorId,
            data: _data,
            timestamp: block.timestamp
        }));

        emit RecordCreated(_patientId, _doctorId, _data, block.timestamp);
    }

    function getRecordsByPatient(string memory _patientId) public view returns (Record[] memory) {
        Record[] memory patientRecords = new Record[](records.length);
        uint256 count = 0;

        for (uint256 i = 0; i < records.length; i++) {
            if (keccak256(bytes(records[i].patientId)) == keccak256(bytes(_patientId))) {
                patientRecords[count] = records[i];
                count++;
            }
        }

        Record[] memory result = new Record[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = patientRecords[i];
        }

        return result;
    }
}