# Convo Contracts

## Deployment Addresses & Links

### V1

```json
{
  "80001": {
    "NftDescriptor": "0x1DcB8c596618Bc969732254eaa0893866d1BD3FD",
    "Omnid": "0xCe439983CDB28864F1d65C27379D8b3ef92192b4"
  },
  "65": {
    "NftDescriptor": "0x65CAEC30a86135c1dce58f8d4b469E67F87692c2",
    "Omnid": "0x71f66599Ee700b14dE3F00EF6620cbA70964a1D3"
  }
}
```

Matic Mumbai config
- [Chainlink Oracle](https://market.link/jobs/4002bb77-a1c0-4dcc-8480-9130fa7bb26f)
- [Chainlink Upkeep](https://keepers.chain.link/mumbai/134)
- [Opensea Collection](https://testnets.opensea.io/collection/omnid-49wswfcoyi)
- [Omnid Contract](https://mumbai.polygonscan.com/address/0xCe439983CDB28864F1d65C27379D8b3ef92192b4)
- [NftDescriptor Contract](https://mumbai.polygonscan.com/address/0x1DcB8c596618Bc969732254eaa0893866d1BD3FD)


### V2

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
