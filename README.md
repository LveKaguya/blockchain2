Assignment 2
 Blockchain Technologies
Group: SE-2321
Student: Aslan Koishigulov

For this assignment is used: 
Truffle
Ganache 
MetaMask
Visual Studio Code
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModelMarketplace {
    struct Model {
        uint id;
        string name;
        string description;
        uint price;
        uint rating;
        address owner;
    }

    uint public modelCount = 0;
    mapping(uint => Model) public models;

    event ModelListed(uint modelId, string name, string description, uint price, address owner);

    function listModel(string memory name, string memory description, uint price) public returns (uint) {
        modelCount++;
        uint modelId = modelCount;

        models[modelId] = Model({
            id: modelId,
            name: name,
            description: description,
            price: price,
            rating: 0,
            owner: msg.sender
        });

        emit ModelListed(modelId, name, description, price, msg.sender);

        return modelId;
    }

    function getModelDetails(uint modelId) public view returns (string memory, string memory, uint, uint, address) {
        Model storage model = models[modelId];
        return (model.name, model.description, model.price, model.rating, model.owner);
    }

    function purchaseModel(uint modelId) public payable {
        Model storage model = models[modelId];
        require(msg.value == model.price, "Incorrect price");

        payable(model.owner).transfer(msg.value);
        model.owner = msg.sender;
    }

    function rateModel(uint modelId, uint rating) public {
        Model storage model = models[modelId];
        model.rating = rating;
    }
}


Step 1: Write a code for a smart contract and compile it.
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ModelMarketplace {
    struct Model {
        uint id;
        string name;
        string description;
        uint price;
        uint rating;
        address owner;
    }

    uint public modelCount = 0;
    mapping(uint => Model) public models;

    event ModelListed(uint modelId, string name, string description, uint price, address owner);

    function listModel(string memory name, string memory description, uint price) public returns (uint) {
        modelCount++;
        uint modelId = modelCount;

        models[modelId] = Model({
            id: modelId,
            name: name,
            description: description,
            price: price,
            rating: 0,
            owner: msg.sender
        });

        emit ModelListed(modelId, name, description, price, msg.sender);

        return modelId;
    }

    function getModelDetails(uint modelId) public view returns (string memory, string memory, uint, uint, address) {
        Model storage model = models[modelId];
        return (model.name, model.description, model.price, model.rating, model.owner);
    }

    function purchaseModel(uint modelId) public payable {
        Model storage model = models[modelId];
        require(msg.value == model.price, "Incorrect price");

        payable(model.owner).transfer(msg.value);
        model.owner = msg.sender;
    }

    function rateModel(uint modelId, uint rating) public {
        Model storage model = models[modelId];
        model.rating = rating;
    }
}

npm install -g truffle ganache
truffle compile


Step 3: Build the Frontend
npm install web3
Structure of the frontend: 
/frontend
  /src
    /components
   - app.js
  - index.html
  - index.js
  - styles.css
 ![image](https://github.com/user-attachments/assets/7e4d4f30-0dc3-40d0-8f27-3a268fdf3034)

 
Step 4: Deployment to testnet (MetaMask)
 ![image](https://github.com/user-attachments/assets/3a52d68f-f141-4ec3-850d-aeafa25ed8df)
 ![image](https://github.com/user-attachments/assets/9db54827-9d72-43b2-a5ed-901bd53398d3)


 
Step 5: Deployment to Ganache
Update the truffle-config.js
Create a Migration File - 2_deploy_contracts.js
truffle compile
truffle migrate --network development
truffle console --network development
 ![image](https://github.com/user-attachments/assets/174f32fc-bd6d-4b5c-95a3-d9bcf1fb8fc0)
 ![image](https://github.com/user-attachments/assets/775f2d1b-a798-44ef-a494-5dfde52174ef)
 ![image](https://github.com/user-attachments/assets/2e4c731b-28e9-4492-8983-d954b325f576)

Step 6: Deployment to frontend (MetaMask)
 ![image](https://github.com/user-attachments/assets/6ff5003b-b1d8-4c74-a662-f4c2bd43a328)
 ![image](https://github.com/user-attachments/assets/755a1775-a68c-4753-ad10-4c54c1ed62dc)
 ![image](https://github.com/user-attachments/assets/859029ed-1bb1-453a-8fed-97b9c2c135bc)
 
Example of Use:
Model details: The details of the model you listed.
Balances: After the purchase, the balances of the seller and buyer should reflect the transaction.
Buyer of the Model: The buyer's address should be displayed as the new owner of the model.
 

