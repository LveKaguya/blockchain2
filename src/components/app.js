// Smart contract configuration
const contractAddress = "0x996f72047B4951e700318A11b5fD0c07aEdE4270";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "ModelListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ModelPurchased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "rater",
				"type": "address"
			}
		],
		"name": "ModelRated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			}
		],
		"name": "purchaseModel",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			}
		],
		"name": "rateModel",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "modelId",
				"type": "uint256"
			}
		],
		"name": "getModelDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "modelCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "models",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "creator",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "ratingSum",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "ratingCount",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

let web3, contract, account;

window.onload = async () => {
  // Check if MetaMask is installed
  if (window.ethereum) {
    // Initialize web3 with MetaMask as the provider
    web3 = new Web3(window.ethereum);

    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    account = (await web3.eth.getAccounts())[0];

    // Initialize the contract with ABI and address
    contract = new web3.eth.Contract(contractABI, contractAddress);

    console.log('MetaMask is installed and connected!');
    loadModels(); // Call this to load models if needed
  } else {
    alert("Please install MetaMask to use this app!");
  }
};

// Ensure Web3 is available
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
} else {
  alert('Please install MetaMask!');
}

// List a Model
document.getElementById('listModelForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('modelName').value;
  const description = document.getElementById('modelDescription').value;
  const price = web3.utils.toWei(document.getElementById('modelPrice').value, 'ether');

  try {
      // Interact with the smart contract
      await contract.methods.listModel(name, description, price).send({ from: account });
      alert('Model listed successfully!');
  } catch (error) {
      console.error('Error while listing model:', error);
      alert('Error listing model. Please check the logs.');
  }
});

// Purchase a Model
document.getElementById('purchaseModelForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const modelId = document.getElementById('modelId').value;

  try {
    // Fetch model details by the unique model ID
    const model = await contract.methods.models(modelId).call();
    const price = model.price;

    // Send transaction to purchase the model
    await contract.methods.purchaseModel(modelId).send({ from: account, value: price });
    alert('Model purchased successfully!');
  } catch (error) {
    console.error(error);
    alert('Error purchasing model.');
  }
});

// Rate a Model
document.getElementById('rateModelForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const modelId = document.getElementById('rateModelId').value;
  const rating = document.getElementById('rating').value;

  try {
    // Send rating to the contract
    await contract.methods.rateModel(modelId, rating).send({ from: account });
    alert('Model rated successfully!');
  } catch (error) {
    console.error(error);
    alert('Error rating model.');
  }
});

// Get Model Details
document.getElementById('getModelDetailsForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const modelId = document.getElementById('detailsModelId').value;

  try {
    // Fetch model details from the contract
    const modelDetails = await contract.methods.getModelDetails(modelId).call();

    // Display model details, including owner address and unique model ID
    document.getElementById('modelNameDisplay').innerText = `Name: ${modelDetails[0]}`;
    document.getElementById('modelDescriptionDisplay').innerText = `Description: ${modelDetails[1]}`;
    document.getElementById('modelPriceDisplay').innerText = `Price: ${web3.utils.fromWei(modelDetails[2], 'ether')} ETH`;
    document.getElementById('modelRatingDisplay').innerText = `Average Rating: ${modelDetails[4]}`;
    document.getElementById('modelOwnerDisplay').innerText = `Owner: ${modelDetails[5]}`;  // Owner's address
    document.getElementById('modelIdDisplay').innerText = `Model ID: ${modelId}`;  // Model's unique ID
  } catch (error) {
    console.error(error);
    alert('Error fetching model details.');
  }
});

// Initialize the app
async function loadModels() {
  // Call any logic to load models or display initial data
  console.log('Loading models...');
}
