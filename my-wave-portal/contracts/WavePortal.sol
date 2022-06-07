// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    // store wave person address
    address[] arrayWavePerson;
    // we will be using this below to help generate a random number 
    uint256 private seed;

    /*
    * A little magic, Googl what events are ain Solidity!
    */
    event NewWave(address indexed from, uint256 timestamp, string message);

    /*
    * I created a struct here named Wave. 
    * A Struct is basically a custom datatype where we can customize what we want to hold insidd it. 
    */
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent. 
        uint256 timestamp; // The timestamp when the user waved. 
    }

    /*
    * I declare a variable waves that lets me store an array of structs. 
    * This is what lets me hold all the waves anyone ever sends to me! 
    **/
    Wave[] waves;

    constructor() payable {
        console.log("I AM SMART CONTRACT. POG.");

        // Set the initial seed  
        seed = (block.timestamp + block.difficulty) % 100;
    }

    /*
    * You'll notice I changed the wave function a little here as well and 
    * now it requires a string called _message. This is the message our user 
    * sends us from the fronted! 
    */
    function wave(string memory _message) public {
        totalWaves += 1;
        arrayWavePerson.push(msg.sender);
        console.log("%s waved w/ message %s!", msg.sender, _message);

        /*
        * This is where I actually store the wave data in the array. 
        **/
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // generate a new seed for the next user that sends a wave 
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Rabdom # generated : %d", seed);


        if (seed <= 50) {
            
            // The same code we had before to send the prize.
            uint256 prizeAmount = 0.0001 ether; 
            require ( 
                prizeAmount <= address(this).balance, 
                "Trying to withdraw more money than the contract has."
            );

            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }       

        /*
        * I added some anciness here, Google it and try to figure out what it is! 
        * Let me know what you learn in #gerneral-chiil-chat
        */
        emit NewWave(msg.sender, block.timestamp, _message);
    }


    /*
    * I added a function getALllWaves which will return the struct array, waves, to us. 
    * This will make it easy to retrieve the waves from out website!
    **/
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        // Optional:Add this line if you want to see the contract print the value! 
        // We'll also print it over in run.js as well. 
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