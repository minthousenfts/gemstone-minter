# Gemstone generator for Multi Grain & Cane Whiskey

- ERC1155 #1:
  - 6 different token types (6 different gem stones)
  - 50 of each token (6x50 = 300 tokens total supply), but all are NFTs (so all have different #IDs; for example #1-#50 is type 1, #51-100 is type 2, etc.)
  - Address must be whitelisted for a specific address in order to mint a gemstone NFT of a specific type
  - Addresses will be whitlelisted by client
  - max 1 token type mint per address (i.e. user A can only mint 1x gemstone A)
  - Gemstone tokens must have a property to keep track of whether it’s been used to redeem a goblet or not (`redeemed` property)
  - 1-1.5 weeks turnaround time (because launch was already delayed)
- ERC1155 #2:
  - 1 token type, the gemstone goblet
  - users can use 6 unused gemstones to mint 1 goblet
  - for the next 3 or so (TBD) years, users can mint ‘REPLICA’ goblets every year (each year will have different art)

Metadata sample:
Redeemed : https://gateway.pinata.cloud/ipfs/QmaUzAyJ5hrovGtPdVg9ZQTjo1Q2ZYU7ztZ1SQG3C6Z26D/1.json

Not-Redeemed : https://gateway.pinata.cloud/ipfs/QmYn21JY4tgB7EN35z11papkWG2YqyNdqiZJDN78zh8hYc/1.json

Goblet opensea : https://testnets.opensea.io/collection/malt-grain-cane-whiskey-pplgobox2b

Useful scripts:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat test ./test/goblet-test.js
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
