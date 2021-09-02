{{Project Name}} : 
Hotel Booking
			

###Description:

This is a hotel booking that runs on the blockchain. It allows owner to list room for sale, it also allows people to book them  with cryptocurrency.Whenever someone buy the room, they instantly become the owner. That’s because this application is powered by a smart contract on the blockchain which manages the hotel. It tracks who owns the room for sale, and it transfers the ownership of the items automatically anytime someone buys them with cryptocurrency.


####Prerequisites:

In order to run this project locally in your computer you need the following packages installed in your System and the commands to install the packages are given below:

1. download the project from gitlab 
 
	<command> : git clone https://gitlab.com/jomoljaison/hotel-booking.git
2. First,set up a personal blockchain to develop the application locally.

	<command> : sudo npm install -g ganache-cli

3. You need to install Nodejs.

	<command> : npm install nodejs

4. install truffle
	<command> :$ npm install -g truffle@5.0.5



5. Run the following commands before the project is run:

	1. sudo apt-get install npm
	2. npm install
	3. truffle compile
	4. truffle migrate
	5. truffle console
	6. truffle test
	7. truffle migrate --reset
	8. ganache-cli
	9. npm  start

6. After running the above commands :
    
	1. open metamask and select Kovan Test Network.Open https://kovan.etherscan.io
	2. use Infura to connect Kovan Test Network.Login to Infura ,create project ,change endpoint to kovan,
		copy the URL of ethereum node .This is the ethereum node that we're going to use to deploy the smart contract
	3. Copy the private key of first address in the ganache <command>ganache-cli</command>	then add to metamask.
		import account -> paste your private key string here -> import
	4. Next request some ether .For that go to the link https://gitter.im/kovan.testnet/faucet. Paste the address of    		privatekey here	.Check the metamask wallet
	5. Deploy the smartcontract.open Remix IDE and smart contract.Change the environment to injected web3 and deploy.
		before that make sure that the test network is kovan.change the gas price to 50(GWEI) to make this really fast and gas limits to million units like 10000000
	6. Click on the link that shows inthe deploy page .This will show if this worked on the test network.copy the contract 		address and  transaction hash and paste in json page
	7. Refresh the localhost:3000 , fill the form with room number and ether.After adding the rooms buy the room using another account . If the account didn't have much ether request some ether(repeat from step 4)

