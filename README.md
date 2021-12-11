# Omnid

## Deployment Addresses & Links

```json
{
  "80001": {
    "nftDescriptorV2": "0xCC1ca17B4315Bcd41D4A439f8C657111dE4cBf19",
    "Omnid": "0xF66D5443b4e881c41A16eCd9Ba72C715A413929b"
  }
}
```

Matic Mumbai config
- [Chainlink Oracle](https://market.link/jobs/4002bb77-a1c0-4dcc-8480-9130fa7bb26f)
- [Opensea Collection](https://testnets.opensea.io/collection/omnid-6ubai8ssfu)
- [Omnid Contract](https://mumbai.polygonscan.com/address/0xF66D5443b4e881c41A16eCd9Ba72C715A413929b)
- [NftDescriptor Contract](https://mumbai.polygonscan.com/address/0xCC1ca17B4315Bcd41D4A439f8C657111dE4cBf19)



## Interface
```csharp
interface IOmnid {
  function getScore(address _add_) external view returns(uint256);
  function getIdDetails(address _add) external view returns(uint256, uint256, uint256, bytes32);
}
```
