# NFT Minting Project

This project allows users to mint NFTs by entering a name for the NFT and pressing the mint button. The project is built using the *Move Language* for smart contract development, *Aptos Blockchain* for deployment, and *TypeScript* for the front-end interaction.

## Features
- *NFT Minting*: Users can mint NFTs by simply entering a name and pressing the mint button.
- *Blockchain Integration*: The NFTs are minted on the Aptos blockchain.
- *Move Smart Contracts*: Secure and efficient contracts written in the Move language.
- *Simple UI*: A user-friendly interface built using TypeScript for easy interaction.

## Technologies Used
- *Move Language*: For writing and deploying the NFT smart contracts.
- *Aptos Blockchain*: The platform where the NFTs are minted and stored.
- *TypeScript*: For building the front-end and interacting with the blockchain.

## How It Works
1. *Enter NFT Name*: The user inputs the desired name for the NFT.
2. *Minting*: After entering the name, the user clicks the mint button to create the NFT.
3. *Blockchain Interaction*: The system uses the Aptos blockchain to mint and register the NFT on-chain.
4. *Confirmation*: Once minted, the NFT is associated with the user’s account and can be viewed on the blockchain.

## Prerequisites
Before running the project, ensure you have the following installed:
- *Aptos CLI*: To deploy and interact with the smart contracts.
- *Move SDK*: To develop and deploy the smart contracts.
- *Node.js and npm*: To manage and run the TypeScript front-end.

## Deploy the Smart Contract
To deploy the smart contract:

Install Aptos CLI.

Update the Move.toml file with your wallet address:

aptos init
Add your Account addr here for Deployment
marketplace_addr = '0x988e36ebe7fcb4c7cc4266f7c53850c2010b09bfb843935cf196f530ec2e1153'
Compile and publish the contract:

aptos move compile
aptos move publish
