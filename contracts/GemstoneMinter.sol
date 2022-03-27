//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Gemstone.sol";
import {Types} from "./libs/Types.sol";

contract GemstoneMinter is Gemstone, ERC1155 {
    constructor() ERC1155("www.example.com") {
        console.log("Init GemstoneMinter success");
    }

    function mint(address customerAddress, uint8 gemstoneType) public payable {
        require(isGemstoneAvailable(gemstoneType), "Gemstone not available");
        require(
            !isGemstoneMinted(customerAddress, gemstoneType),
            "Gemstone already minted"
        );
        addToWhitelist(customerAddress, gemstoneType);
        uint8 mintId = recordPurchase(customerAddress, gemstoneType);
        //Todo add the right data or throw it out depending on what the ipfs structure looks like
        //Gem 1 NFTs would have IDs: 1,2,3... Gem 2 would be 101, 102, 103... and so on
        _mint(customerAddress, gemstoneType * 100 + mintId, 1, "");
        _setURI("The URI which contains gemstoneType and mintId");
    }

    function getOwner() public view returns (address) {
        return getOwnerAddress();
    }

    function getPurchasesOfCustomer(address customerAddress)
        public
        view
        returns (Types.PurchaseInfo[] memory purchases)
    {
        return getPurchasesOfUser(customerAddress);
    }
}