var contractBalance = document.querySelector('#contractBalance'),
 	ownerBalance = document.querySelector('#aliceBalance'),
	bobBalance = document.querySelector('#bobBalance'),
	carolBalance = document.querySelector('#carolBalance');

if (typeof web3 !== 'undefined') {
  // Don't lose an existing provider, like Mist or Metamask
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Your deployed address changes every time you deploy.
var splitterAddress = "0x7e529aebac4c69ac00f944fafcbb3430d9e9683f"; // <-- Put your own
splitterInstance = web3.eth.contract(splitterCompiled.abi).at(splitterAddress);

// Query eth for balance
web3.eth.getBalance(splitterAddress, function(err, balance) {
    if (err) {
        console.log(err);
    } else {
        console.log(contractBalance, "Contract balance: " + balance);
        contractBalance.innerHTML = balance;
    }
});

function showBalance(sender, senderEl) {
	// Query the contract directly
	splitterInstance.getBalance.call(sender, function(err, balance) {
	    if (err) {
	        console.log(err);
	    } else {
	        senderEl.innerHTML = balance;
	    }
	});
}

function sendFunds(){
	var amount = parseInt(document.getElementById('sendingAmount').value),
		sendFrom = document.getElementById('sendFrom').value;

	if(isNaN(amount)){
		alert('Invalid amount');
	}
	else{

		function onTransfer(err, rsp){
			if(err)alert('failed to transfer');
			else location.reload();
		};

		switch(sendFrom){
			case 'alice':
				splitterInstance.contribute({from: web3.eth.accounts[0], value: amount, gas: 90000}, onTransfer);
				break;

			case 'bob':
				splitterInstance.contribute({from: web3.eth.accounts[0], value: amount, gas: 90000}, onTransfer);
				break;

			case 'carol':
				splitterInstance.contribute({from: web3.eth.accounts[0], value: amount, gas: 90000}, onTransfer);
				break;
		}
	}
}

showBalance(0, ownerBalance);
showBalance(1, bobBalance);
showBalance(2, carolBalance);