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
