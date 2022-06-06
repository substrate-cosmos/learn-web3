// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;

    // store wave person address
    address[] arrayWavePerson;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        arrayWavePerson.push(msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("getTotalWaves");
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getTotalArrayWavePerson() public view returns (uint256) {
        console.log("getTotalArrayWavePerson");
        
        uint256 index = 0;
        for (index = 0; index < totalWaves; index += 1) {
            console.log("Wave address [%s] !", arrayWavePerson[index]);
        }
        
        return arrayWavePerson.length;
    }
}